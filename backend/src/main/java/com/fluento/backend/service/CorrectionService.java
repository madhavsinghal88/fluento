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

    @Value("${openai.api.model:google/gemini-2.0-flash-001}")
    private String model;

    private final ObjectMapper objectMapper;
    private final RestClient restClient = RestClient.builder()
            .baseUrl("https://openrouter.ai/api/v1")
            .build();

    public CorrectionResponse correctSentence(String sentence) {
        log.info("Requesting expertise for: [{}]. Using Key: [{}] and Model: [{}]", 
            sentence, apiKey.substring(0, 5), model);

        try {
            // OpenAI chat completion request body
            Map<String, Object> body = Map.of(
                "model", model,
                "messages", List.of(
                    Map.of("role", "system", "content", "You are a professional children's English tutor. Your goal is to help kids improve their writing. " +
                           "Input will be a child's sentence. Response MUST be in JSON format with three fields:\n" +
                           "1. 'corrected': A grammatically perfect version of their sentence (keep it simple).\n" +
                           "2. 'improved': A MUCH better, 'Expert Mode' version using sophisticated vocabulary and synonyms. If they use 'happy', use 'cheerful' or 'radiant'. If they use 'smart', use 'brilliant'.\n" +
                           "3. 'explanation': A friendly, encouraging explanation for a child explaining WHY the improved version is better and what the new words mean."),
                    Map.of("role", "user", "content", sentence)
                )
            );

            String response = restClient.post()
                    .uri("/chat/completions")
                    .header("Authorization", "Bearer " + apiKey)
                    .header("HTTP-Referer", "http://localhost:8080")
                    .header("X-Title", "Fluento Learning App (Tutor)")
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
            
            // Expert Expertise Cleaner (handles backticks if AI provides them)
            if (content.contains("```json")) {
                content = content.substring(content.indexOf("```json") + 7);
                if (content.contains("```")) {
                    content = content.substring(0, content.indexOf("```"));
                }
            } else if (content.contains("```")) {
                content = content.substring(content.indexOf("```") + 3);
                if (content.contains("```")) {
                    content = content.substring(0, content.indexOf("```"));
                }
            }

            return objectMapper.readValue(content.trim(), CorrectionResponse.class);

        } catch (Exception e) {
            log.error("Failed to call OpenAI for sentence correction. Using friendly fallback.", e);
            // Fallback for children so the game never breaks
            return CorrectionResponse.builder()
                .corrected(sentence)
                .explanation("Your sentence is wonderful! Each word shows how much you are learning. Keep practicing!")
                .improved("You are doing amazing! Try adding more descriptive words next time.")
                .build();
        }
    }
}
