package com.fluento.backend.service;

import com.fluento.backend.dto.WordDTO;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.TimeUnit;

@Service
@RequiredArgsConstructor
@Slf4j
public class DailyWordsService {

    @Value("${openai.api.key}")
    private String apiKey;

    @Value("${openai.api.model:google/gemini-2.0-flash-001}")
    private String model;

    private final ObjectMapper objectMapper;
    private final RestClient restClient = RestClient.builder()
            .baseUrl("https://openrouter.ai/api/v1")
            .build();

    // Cache per level
    private final Map<Integer, List<WordDTO>> levelCache = new ConcurrentHashMap<>();
    private final Map<Integer, Long> cacheTimes = new ConcurrentHashMap<>();
    private static final long CACHE_DURATION = TimeUnit.HOURS.toMillis(12);

    public List<WordDTO> getWordsByLevel(int level) {
        long currentTime = System.currentTimeMillis();
        if (levelCache.containsKey(level) && (currentTime - cacheTimes.get(level) < CACHE_DURATION)) {
            log.info("Returning cached words for level {}", level);
            return levelCache.get(level);
        }

        int wordCount = switch (level) {
            case 1 -> 5;
            case 2 -> 6;
            case 3 -> 7;
            case 4 -> 8;
            case 5 -> 10;
            default -> (level > 5) ? 10 : 5;
        };

        try {
            log.info("Generating exactly {} words for level {} via OpenAI", wordCount, level);
            
            String systemPrompt = "Generate EXACTLY " + wordCount + " English vocabulary words for level " + level + ". " +
                    "Return ONLY a JSON array of objects. Each object should have 'word', 'meaning', and 'example' fields. " +
                    "Do NOT return more or fewer words than " + wordCount + ". Simple/Child-friendly.";

            Map<String, Object> request = Map.of(
                "model", model,
                "messages", List.of(
                    Map.of("role", "system", "content", systemPrompt),
                    Map.of("role", "user", "content", "Generate words.")
                )
            );

            String responseBody = restClient.post()
                    .uri("/chat/completions")
                    .header("Authorization", "Bearer " + apiKey)
                    .header("HTTP-Referer", "http://localhost:8080")
                    .header("X-Title", "Fluento Learning App (Words)")
                    .body(request)
                    .retrieve()
                    .body(String.class);

            Map<String, Object> responseMap = objectMapper.readValue(responseBody, new TypeReference<>() {});
            List<Map<String, Object>> choices = (List<Map<String, Object>>) responseMap.get("choices");
            Map<String, Object> message = (Map<String, Object>) choices.get(0).get("message");
            String content = (String) message.get("content");

            // AI might return { "words": [...] } or sometimes just the array
            List<WordDTO> words;
            if (content.trim().startsWith("{")) {
                Map<String, List<WordDTO>> wrapper = objectMapper.readValue(content, new TypeReference<>() {});
                words = new ArrayList<>(wrapper.get(wrapper.keySet().iterator().next())); // Extract the array from any key
            } else {
                words = objectMapper.readValue(content, new TypeReference<>() {});
            }

            // CRITICAL VALIDATION
            if (words.size() > wordCount) {
                log.warn("AI returned extra words ({}), slicing to required {}", words.size(), wordCount);
                words = words.subList(0, wordCount);
            } else if (words.size() < wordCount) {
                log.warn("AI returned fewer words ({}), retrying once...", words.size());
                return getWordsByLevel(level); // Simple retry
            }

            this.levelCache.put(level, words);
            this.cacheTimes.put(level, currentTime);

            return words;
        } catch (Exception e) {
            log.error("Failed to generate level words", e);
            return getFallbackWords(wordCount);
        }
    }

    // Keep the old deprecated method for compatibility with other controllers until fully refactored
    public List<WordDTO> getDailyWords() {
        return getWordsByLevel(1);
    }

    private List<WordDTO> getFallbackWords(int count) {
        log.info("Using FallbackWordLibrary for {} words", count);
        List<WordDTO> all = FallbackWordLibrary.ALL_WORDS;
        List<WordDTO> result = new ArrayList<>();
        
        // Pick random words from the library
        java.util.Collections.shuffle(all);
        for (int i = 0; i < Math.min(all.size(), count); i++) {
            result.add(all.get(i));
        }
        return result;
    }
}
