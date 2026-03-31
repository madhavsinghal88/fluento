package com.fluento.backend.service;

import com.fluento.backend.dto.CorrectionResponse;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
@Slf4j
public class CorrectionService {

    @Value("${openai.api.key}")
    private String apiKey;

    @Value("${openai.api.model:openai/gpt-4o}")
    private String model;

    private final ObjectMapper objectMapper;
    private final RestClient restClient = RestClient.builder()
            .baseUrl("https://openrouter.ai/api/v1")
            .build();

    public CorrectionResponse correctSentence(String sentence) {
        log.info("Requesting correction for: {}", sentence);

        try {
            // OpenAI chat completion request body
            Map<String, Object> body = Map.of(
                "model", model,
                "messages", List.of(
                    Map.of("role", "system", "content", "You are an English language tutor. Correct the input sentence for grammar. Provide a brief explanation for the correction and a more natural, advanced alternative. Return response strictly in JSON format with fields: 'corrected', 'explanation', 'improved'."),
                    Map.of("role", "user", "content", sentence)
                ),
                "response_format", Map.of("type", "json_object")
            );

            String response = restClient.post()
                    .uri("/chat/completions")
                    .header("Authorization", "Bearer " + apiKey)
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(body)
                    .retrieve()
                    .body(String.class);

            log.debug("OpenAI full response: {}", response);

            // Parsing OpenAI's specific JSON structure: choices[0].message.content
            Map<String, Object> responseMap = objectMapper.readValue(response, Map.class);
            List<Map<String, Object>> choices = (List<Map<String, Object>>) responseMap.get("choices");
            Map<String, Object> message = (Map<String, Object>) choices.getFirst().get("message");
            String content = (String) message.get("content");

            return objectMapper.readValue(content, CorrectionResponse.class);

        } catch (Exception e) {
            log.error("Failed to call OpenAI for sentence correction.", e);
            throw new RuntimeException("AI Correction Service Error: " + e.getMessage());
        }
    }
}
