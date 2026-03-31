package com.fluento.backend.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
@Slf4j
public class HintService {

    @Value("${openai.api.key}")
    private String apiKey;

    @Value("${openai.api.model:openai/gpt-4o}")
    private String model;

    private final ObjectMapper objectMapper;
    private final RestClient restClient = RestClient.builder()
            .baseUrl("https://openrouter.ai/api/v1")
            .build();

    public String generateHint(String word) {
        log.info("Generating hint for word: {}", word);

        try {
            String systemPrompt = "You are a friendly AI tutor for kids. A child needs to write a sentence using the word '" + word + "'. " +
                                 "Do NOT give them the full sentence. Give them a 'Sentence Starter' (a few words to begin with) " +
                                 "that makes it easy for them to finish. " +
                                 "Example for 'Happy': 'Today I feel very...' " +
                                 "Return ONLY the sentence starter text, no quotes.";

            Map<String, Object> request = Map.of(
                "model", model,
                "messages", List.of(
                    Map.of("role", "system", "content", systemPrompt),
                    Map.of("role", "user", "content", "Generate a hint for: " + word)
                )
            );

            String responseBody = restClient.post()
                    .uri("/chat/completions")
                    .header("Authorization", "Bearer " + apiKey)
                    .body(request)
                    .retrieve()
                    .body(String.class);

            Map<String, Object> responseMap = objectMapper.readValue(responseBody, Map.class);
            List<Map<String, Object>> choices = (List<Map<String, Object>>) responseMap.get("choices");
            Map<String, Object> message = (Map<String, Object>) choices.get(0).get("message");
            return (String) message.get("content");

        } catch (Exception e) {
            log.error("Failed to generate hint for word: {}", word, e);
            return "I love to use the word " + word + " because...";
        }
    }
}
