package com.fluento.backend.service;

import com.fluento.backend.dto.QuizDTO;
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
public class QuizService {

    @Value("${openai.api.key}")
    private String apiKey;

    @Value("${openai.api.model:openai/gpt-4o}")
    private String model;

    private final ObjectMapper objectMapper;
    private final RestClient restClient = RestClient.builder()
            .baseUrl("https://openrouter.ai/api/v1")
            .build();

    private final Map<String, List<QuizDTO>> cachedQuizzes = new ConcurrentHashMap<>();
    private final Map<String, Long> lastCacheTimes = new ConcurrentHashMap<>();
    private static final long CACHE_DURATION = TimeUnit.HOURS.toMillis(24);

    public List<QuizDTO> getQuiz(String mode, int level, int age) {
        String cacheKey = mode + "_" + level + "_age" + age;
        long currentTime = System.currentTimeMillis();
        
        if (cachedQuizzes.containsKey(cacheKey) && (currentTime - lastCacheTimes.get(cacheKey) < CACHE_DURATION)) {
            log.info("Returning cached quiz for key: {}", cacheKey);
            return cachedQuizzes.get(cacheKey);
        }

        try {
            log.info("Generating level {} quiz for age {} via AI", level, age);
            
            String ageContext = age < 8 ? "for very young children (use simple words)" : "for school kids";
            if (age > 12) ageContext = "for teenagers (make it academic and challenging)";

            String difficultyStr = switch (level) {
                case 1 -> "very easy, basic big states/countries";
                case 2 -> "easy, regionally diverse";
                case 3 -> "medium, common but slightly less famous";
                case 4 -> "hard, small states or distant countries";
                case 5 -> "challenging, obscure or tricky regions";
                default -> "medium";
            };

            String topicPrompt = mode.equals("india") 
                ? "Indian states/UTs and their capitals. " + ageContext + ". CRITICAL: For level " + level + ", use DIFFERENT states than lower levels."
                : "World countries and their capitals. " + ageContext + ". Level " + level + " must be completely unique.";

            String systemPrompt = String.format(
                "Generate EXACTLY 5 high-quality unique multiple choice questions about %s. " +
                "Difficulty: Level %d/5 (%s). " +
                "Response MUST be a JSON object with 'questions' key. No duplicates ever.",
                topicPrompt, level, difficultyStr
            );
            
            Map<String, Object> request = Map.of(
                "model", model,
                "messages", List.of(
                    Map.of("role", "system", "content", systemPrompt),
                    Map.of("role", "user", "content", "Provide 5 unique questions for level " + level)
                ),
                "response_format", Map.of("type", "json_object")
            );

            String responseBody = restClient.post()
                    .uri("/chat/completions")
                    .header("Authorization", "Bearer " + apiKey)
                    .body(request)
                    .retrieve()
                    .body(String.class);

            Map<String, Object> responseMap = objectMapper.readValue(responseBody, new TypeReference<>() {});
            List<Map<String, Object>> choices = (List<Map<String, Object>>) responseMap.get("choices");
            Map<String, Object> message = (Map<String, Object>) choices.get(0).get("message");
            String content = (String) message.get("content");

            Map<String, List<QuizDTO>> result = objectMapper.readValue(content, new TypeReference<>() {});
            List<QuizDTO> questions = result.get("questions");
            
            if (questions != null && !questions.isEmpty()) {
                this.cachedQuizzes.put(cacheKey, questions);
                this.lastCacheTimes.put(cacheKey, currentTime);
                return questions;
            }
            throw new RuntimeException("Empty response from AI");
            
        } catch (Exception e) {
            log.warn("AI Quiz failed for {}, falling back to hardcoded safety list.", cacheKey);
            return getFallbackQuiz(mode, level);
        }
    }

    private List<QuizDTO> getFallbackQuiz(String mode, int level) {
        if (mode.equals("india")) {
            return switch (level) {
                case 1 -> List.of(
                    new QuizDTO("Capital of Maharashtra?", List.of("Mumbai", "Pune", "Nashik", "Nagpur"), "Mumbai"),
                    new QuizDTO("Capital of Karnataka?", List.of("Bangalore", "Mysore", "Hubli", "Belgaum"), "Bangalore"),
                    new QuizDTO("Capital of Tamil Nadu?", List.of("Chennai", "Madurai", "Coimbatore", "Salem"), "Chennai"),
                    new QuizDTO("Capital of West Bengal?", List.of("Kolkata", "Howrah", "Durgapur", "Siliguri"), "Kolkata"),
                    new QuizDTO("Capital of Bihar?", List.of("Patna", "Gaya", "Bhagalpur", "Muzaffarpur"), "Patna")
                );
                case 2 -> List.of(
                    new QuizDTO("Capital of Rajasthan?", List.of("Jaipur", "Jodhpur", "Udaipur", "Bikaner"), "Jaipur"),
                    new QuizDTO("Capital of Gujarat?", List.of("Gandhinagar", "Ahmedabad", "Surat", "Rajkot"), "Gandhinagar"),
                    new QuizDTO("Capital of Punjab?", List.of("Chandigarh", "Ludhiana", "Amritsar", "Patiala"), "Chandigarh"),
                    new QuizDTO("Capital of Kerala?", List.of("Trivandrum", "Kochi", "Kozhikode", "Kannur"), "Trivandrum"),
                    new QuizDTO("Capital of Madhya Pradesh?", List.of("Bhopal", "Indore", "Gwalior", "Jabalpur"), "Bhopal")
                );
                case 3 -> List.of(
                    new QuizDTO("Capital of Assam?", List.of("Dispur", "Guwahati", "Silchar", "Dibrugarh"), "Dispur"),
                    new QuizDTO("Capital of Odisha?", List.of("Bhubaneswar", "Cuttack", "Rourkela", "Puri"), "Bhubaneswar"),
                    new QuizDTO("Capital of Jharkhand?", List.of("Ranchi", "Jamshedpur", "Dhanbad", "Bokaro"), "Ranchi"),
                    new QuizDTO("Capital of Haryana?", List.of("Chandigarh", "Gurgaon", "Panipat", "Ambala"), "Chandigarh"),
                    new QuizDTO("Capital of Chhattisgarh?", List.of("Raipur", "Bilaspur", "Durg", "Raigarh"), "Raipur")
                );
                case 4 -> List.of(
                    new QuizDTO("Capital of Sikkim?", List.of("Gangtok", "Namchi", "Geyzing", "Mangan"), "Gangtok"),
                    new QuizDTO("Capital of Goa?", List.of("Panaji", "Margao", "Vasco da Gama", "Mapusa"), "Panaji"),
                    new QuizDTO("Capital of Himachal Pradesh?", List.of("Shimla", "Dharamshala", "Mandi", "Solan"), "Shimla"),
                    new QuizDTO("Capital of Uttarakhand?", List.of("Dehradun", "Gairsain", "Haridwar", "Rishikesh"), "Dehradun"),
                    new QuizDTO("Capital of Manipur?", List.of("Imphal", "Thoubal", "Churachandpur", "Ukhrul"), "Imphal")
                );
                default -> List.of(
                    new QuizDTO("Capital of Tripura?", List.of("Agartala", "Udaipur", "Dharmanagar", "Kailasahar"), "Agartala"),
                    new QuizDTO("Capital of Nagaland?", List.of("Kohima", "Dimapur", "Mokokchung", "Tuensang"), "Kohima"),
                    new QuizDTO("Capital of Mizoram?", List.of("Aizawl", "Lunglei", "Saiha", "Champhai"), "Aizawl"),
                    new QuizDTO("Capital of Meghalaya?", List.of("Shillong", "Tura", "Jowai", "Nongpoh"), "Shillong"),
                    new QuizDTO("Capital of Arunachal Pradesh?", List.of("Itanagar", "Naharlagun", "Pasighat", "Tawang"), "Itanagar")
                );
            };
        } else {
            // World Fallbacks - Completely Unique Across 5 Levels
            return switch (level) {
                case 1 -> List.of(
                    new QuizDTO("Capital of France?", List.of("Paris", "Lyon", "Marseille", "Nice"), "Paris"),
                    new QuizDTO("Capital of Japan?", List.of("Tokyo", "Osaka", "Kyoto", "Nagoya"), "Tokyo"),
                    new QuizDTO("Capital of UK?", List.of("London", "Manchester", "Birmingham", "Edinburgh"), "London"),
                    new QuizDTO("Capital of USA?", List.of("Washington D.C.", "New York", "Chicago", "Los Angeles"), "Washington D.C."),
                    new QuizDTO("Capital of Germany?", List.of("Berlin", "Munich", "Frankfurt", "Hamburg"), "Berlin")
                );
                case 2 -> List.of(
                    new QuizDTO("Capital of Canada?", List.of("Ottawa", "Toronto", "Vancouver", "Montreal"), "Ottawa"),
                    new QuizDTO("Capital of Australia?", List.of("Canberra", "Sydney", "Melbourne", "Brisbane"), "Canberra"),
                    new QuizDTO("Capital of Brazil?", List.of("Brasilia", "Rio", "Sao Paulo", "Salvador"), "Brasilia"),
                    new QuizDTO("Capital of Russia?", List.of("Moscow", "Saint Petersburg", "Novosibirsk", "Sochi"), "Moscow"),
                    new QuizDTO("Capital of China?", List.of("Beijing", "Shanghai", "Guangzhou", "Shenzhen"), "Beijing")
                );
                case 3 -> List.of(
                    new QuizDTO("Capital of Mexico?", List.of("Mexico City", "Cancun", "Tijuana", "Guadalajara"), "Mexico City"),
                    new QuizDTO("Capital of Italy?", List.of("Rome", "Milan", "Venice", "Florence"), "Rome"),
                    new QuizDTO("Capital of South Korea?", List.of("Seoul", "Busan", "Incheon", "Daegu"), "Seoul"),
                    new QuizDTO("Capital of Egypt?", List.of("Cairo", "Alexandria", "Giza", "Luxor"), "Cairo"),
                    new QuizDTO("Capital of Spain?", List.of("Madrid", "Barcelona", "Seville", "Valencia"), "Madrid")
                );
                case 4 -> List.of(
                    new QuizDTO("Capital of Thailand?", List.of("Bangkok", "Phuket", "Pattaya", "Chiang Mai"), "Bangkok"),
                    new QuizDTO("Capital of Argentina?", List.of("Buenos Aires", "Cordoba", "Rosario", "Mendoza"), "Buenos Aires"),
                    new QuizDTO("Capital of Sweden?", List.of("Stockholm", "Gothenburg", "Malmo", "Uppsala"), "Stockholm"),
                    new QuizDTO("Capital of Turkey?", List.of("Ankara", "Istanbul", "Izmir", "Bursa"), "Ankara"),
                    new QuizDTO("Capital of South Africa?", List.of("Pretoria", "Cape Town", "Johannesburg", "Durban"), "Pretoria")
                );
                default -> List.of(
                    new QuizDTO("Capital of Kazakhstan?", List.of("Astana", "Almaty", "Shymkent", "Karaganda"), "Astana"),
                    new QuizDTO("Capital of Mongolia?", List.of("Ulaanbaatar", "Erdenet", "Darkhan", "Khovd"), "Ulaanbaatar"),
                    new QuizDTO("Capital of Iceland?", List.of("Reykjavik", "Akureyri", "Keflavik", "Vik"), "Reykjavik"),
                    new QuizDTO("Capital of Kenya?", List.of("Nairobi", "Mombasa", "Kisumu", "Nakuru"), "Nairobi"),
                    new QuizDTO("Capital of New Zealand?", List.of("Wellington", "Auckland", "Christchurch", "Dunedid"), "Wellington")
                );
            };
        }
    }
}
