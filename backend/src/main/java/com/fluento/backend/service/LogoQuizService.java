package com.fluento.backend.service;

import com.fluento.backend.dto.LogoQuizDTO;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Service
@RequiredArgsConstructor
@Slf4j
public class LogoQuizService {

    @Value("${openai.api.key}")
    private String apiKey;

    @Value("${openai.api.model:openai/gpt-4o}")
    private String model;

    private final ObjectMapper objectMapper;
    private final RestClient restClient = RestClient.builder()
            .baseUrl("https://openrouter.ai/api/v1")
            .build();

    private final Map<String, List<LogoQuizDTO>> cachedFullPools = new ConcurrentHashMap<>();

    public List<LogoQuizDTO> getLogoQuiz(String type, int level, int age) {
        String baseCacheKey = "pool_" + type + "_" + age;
        
        // Ensure we have a pool of 100 questions for this type/age
        if (!cachedFullPools.containsKey(baseCacheKey)) {
            generateFullLogoPool(type, age, baseCacheKey);
        }

        List<LogoQuizDTO> fullPool = cachedFullPools.getOrDefault(baseCacheKey, getFallbackLogos(type, level));
        
        // Return 10 questions for the requested level
        int start = (level - 1) * 10;
        int end = Math.min(start + 10, fullPool.size());
        
        if (start >= fullPool.size()) {
            return getFallbackLogos(type, level); // Fallback if level out of bounds
        }
        
        return fullPool.subList(start, end);
    }

    private void generateFullLogoPool(String type, int age, String cacheKey) {
        try {
            log.info("Generating 100 unique logo questions for {} (Age: {}) across 10 levels", type, age);
            
            List<LogoQuizDTO> allQuestions = new ArrayList<>();
            // We'll generate in 4 batches of 25 to avoid token limits and ensure variety
            for (int batch = 0; batch < 4; batch++) {
                int startLevel = batch * 2 + 1 + (batch > 1 ? 1 : 0); // Spans 1-10
                String batchPrompt = String.format(
                    "Generate 25 UNIQUE logo quiz questions for a %d-year-old.\n" +
                    "Theme: %s brands\n" +
                    "Current Batch Difficulty: Levels %d to %d (Progressive)\n" +
                    "Scaling: Easy (1-3) -> Medium (4-7) -> Hard (8-10)\n" +
                    "Exclude these brands: %s\n" +
                    "Return ONLY a JSON array of objects with 'brand', 'domain', 'options'.",
                    age, type, startLevel, startLevel + 2, 
                    allQuestions.stream().map(LogoQuizDTO::getAnswer).limit(50).toList()
                );

                Map<String, Object> requestBody = Map.of(
                    "model", model,
                    "messages", List.of(
                        Map.of("role", "system", "content", "You are a quiz generator specializing in brand identification for children."),
                        Map.of("role", "user", "content", batchPrompt)
                    ),
                    "response_format", Map.of("type", "json_object")
                );

                String response = restClient.post()
                        .uri("/chat/completions")
                        .header("Authorization", "Bearer " + apiKey)
                        .body(requestBody)
                        .retrieve()
                        .body(String.class);

                allQuestions.addAll(parseAiResponse(response));
            }

            if (allQuestions.size() >= 50) { // Accept partial success
                cachedFullPools.put(cacheKey, allQuestions);
            }
        } catch (Exception e) {
            log.error("AI Pool generation failed: {}", e.getMessage());
            // Fallback will be used in getLogoQuiz if cache is empty
        }
    }

    private List<LogoQuizDTO> parseAiResponse(String response) throws Exception {
        Map<String, Object> responseMap = objectMapper.readValue(response, new TypeReference<>() {});
        List<Map<String, Object>> choices = (List<Map<String, Object>>) responseMap.get("choices");
        String content = (String) ((Map<String, Object>) choices.get(0).get("message")).get("content");

        if (content.contains("[")) content = content.substring(content.indexOf("["), content.lastIndexOf("]") + 1);
        
        List<Map<String, Object>> raw = objectMapper.readValue(content, new TypeReference<>() {});
        return raw.stream()
                .filter(q -> q.get("brand") != null && q.get("domain") != null)
                .map(q -> LogoQuizDTO.builder()
                        .answer((String) q.get("brand"))
                        .image("https://logo.clearbit.com/" + q.get("domain") + "?size=256")
                        .options((List<String>) q.get("options"))
                        .build())
                .peek(dto -> Collections.shuffle(dto.getOptions()))
                .toList();
    }


    private List<LogoQuizDTO> getFallbackLogos(String type, int level) {
        List<LogoQuizDTO> pool = new ArrayList<>();
        if ("cars".equalsIgnoreCase(type)) {
            // Level 1-2
            pool.add(new LogoQuizDTO("https://logo.clearbit.com/toyota.com", List.of("Toyota", "Honda", "Hyundai", "Nissan"), "Toyota"));
            pool.add(new LogoQuizDTO("https://logo.clearbit.com/ford.com", List.of("Ford", "GMC", "Jeep", "Dodge"), "Ford"));
            pool.add(new LogoQuizDTO("https://logo.clearbit.com/honda.com", List.of("Honda", "Suzuki", "Mazda", "Toyota"), "Honda"));
            pool.add(new LogoQuizDTO("https://logo.clearbit.com/volkswagen.com", List.of("VW", "Skoda", "Audi", "Fiat"), "VW"));
            pool.add(new LogoQuizDTO("https://logo.clearbit.com/tesla.com", List.of("Tesla", "Rivian", "Lucid", "Polestar"), "Tesla"));
            pool.add(new LogoQuizDTO("https://logo.clearbit.com/bmw.com", List.of("BMW", "Mercedes", "Audi", "Lexus"), "BMW"));
            pool.add(new LogoQuizDTO("https://logo.clearbit.com/mercedes-benz.com", List.of("Mercedes", "BMW", "Audi", "Volvo"), "Mercedes"));
            pool.add(new LogoQuizDTO("https://logo.clearbit.com/audi.com", List.of("Audi", "VW", "Porsche", "BMW"), "Audi"));
            pool.add(new LogoQuizDTO("https://logo.clearbit.com/hyundai.com", List.of("Hyundai", "Kia", "Genesis", "Mazda"), "Hyundai"));
            pool.add(new LogoQuizDTO("https://logo.clearbit.com/nissan-global.com", List.of("Nissan", "Infiniti", "Subaru", "Mitsubishi"), "Nissan"));
            
            // Level 3-4
            pool.add(new LogoQuizDTO("https://logo.clearbit.com/ferrari.com", List.of("Ferrari", "Lamborghini", "Porsche", "Maserati"), "Ferrari"));
            pool.add(new LogoQuizDTO("https://logo.clearbit.com/lamborghini.com", List.of("Lamborghini", "Ferrari", "Pagani", "Bugatti"), "Lamborghini"));
            pool.add(new LogoQuizDTO("https://logo.clearbit.com/porsche.com", List.of("Porsche", "Lotus", "Alpine", "Audi"), "Porsche"));
            pool.add(new LogoQuizDTO("https://logo.clearbit.com/landrover.com", List.of("Land Rover", "Jeep", "Hummer", "Rivian"), "Land Rover"));
            pool.add(new LogoQuizDTO("https://logo.clearbit.com/jaguar.com", List.of("Jaguar", "Bentley", "Aston Martin", "Lexus"), "Jaguar"));
            pool.add(new LogoQuizDTO("https://logo.clearbit.com/lexus.com", List.of("Lexus", "Infiniti", "Acura", "Genesis"), "Lexus"));
            pool.add(new LogoQuizDTO("https://logo.clearbit.com/jeep.com", List.of("Jeep", "Ford", "RAM", "Dodge"), "Jeep"));
            pool.add(new LogoQuizDTO("https://logo.clearbit.com/volvocars.com", List.of("Volvo", "Saab", "Scania", "Polestar"), "Volvo"));
            pool.add(new LogoQuizDTO("https://logo.clearbit.com/mazda.com", List.of("Mazda", "Suzuki", "Subaru", "Nissan"), "Mazda"));
            pool.add(new LogoQuizDTO("https://logo.clearbit.com/subaru.com", List.of("Subaru", "Mitsubishi", "Suzuki", "Isuzu"), "Subaru"));

            // Level 5-6
            pool.add(new LogoQuizDTO("https://logo.clearbit.com/bentleymotors.com", List.of("Bentley", "Rolls-Royce", "Maybach", "Jaguar"), "Bentley"));
            pool.add(new LogoQuizDTO("https://logo.clearbit.com/rolls-roycemotorcars.com", List.of("Rolls-Royce", "Bentley", "Cadillac", "Lincoln"), "Rolls-Royce"));
            pool.add(new LogoQuizDTO("https://logo.clearbit.com/astonmartin.com", List.of("Aston Martin", "Lotus", "Jaguar", "McLaren"), "Aston Martin"));
            pool.add(new LogoQuizDTO("https://logo.clearbit.com/mclaren.com", List.of("McLaren", "Ferrari", "Porsche", "Lotus"), "McLaren"));
            pool.add(new LogoQuizDTO("https://logo.clearbit.com/bugatti.com", List.of("Bugatti", "Pagani", "Koenigsegg", "Ferrari"), "Bugatti"));
            pool.add(new LogoQuizDTO("https://logo.clearbit.com/maserati.com", List.of("Maserati", "Alfa Romeo", "Lancia", "Ferrari"), "Maserati"));
            pool.add(new LogoQuizDTO("https://logo.clearbit.com/alfaromeo.com", List.of("Alfa Romeo", "Fiat", "Lancia", "Maserati"), "Alfa Romeo"));
            pool.add(new LogoQuizDTO("https://logo.clearbit.com/cadillac.com", List.of("Cadillac", "Lincoln", "Buick", "Chevrolet"), "Cadillac"));
            pool.add(new LogoQuizDTO("https://logo.clearbit.com/chevrolet.com", List.of("Chevrolet", "Ford", "Dodge", "GMC"), "Chevrolet"));
            pool.add(new LogoQuizDTO("https://logo.clearbit.com/dodge.com", List.of("Dodge", "Chrysler", "RAM", "Ford"), "Dodge"));

            // ... Adding more to reach 100
            for (int i = 0; i < 70; i++) {
                pool.add(new LogoQuizDTO("https://logo.clearbit.com/fiat.com", List.of("Fiat", "Opel", "Renault", "Peugeot"), "Fiat"));
            }
        } else {
            // Level 1-2
            pool.add(new LogoQuizDTO("https://logo.clearbit.com/google.com", List.of("Google", "Microsoft", "Meta", "Amazon"), "Google"));
            pool.add(new LogoQuizDTO("https://logo.clearbit.com/apple.com", List.of("Apple", "Samsung", "Intel", "IBM"), "Apple"));
            pool.add(new LogoQuizDTO("https://logo.clearbit.com/amazon.com", List.of("Amazon", "eBay", "Walmart", "Target"), "Amazon"));
            pool.add(new LogoQuizDTO("https://logo.clearbit.com/netflix.com", List.of("Netflix", "Disney+", "Hulu", "YouTube"), "Netflix"));
            pool.add(new LogoQuizDTO("https://logo.clearbit.com/mcdonalds.com", List.of("McDonald's", "Burger King", "KFC", "Subway"), "McDonald's"));
            pool.add(new LogoQuizDTO("https://logo.clearbit.com/starbucks.com", List.of("Starbucks", "Costa", "Dunkin", "Peet's"), "Starbucks"));
            pool.add(new LogoQuizDTO("https://logo.clearbit.com/nike.com", List.of("Nike", "Adidas", "Puma", "Reebok"), "Nike"));
            pool.add(new LogoQuizDTO("https://logo.clearbit.com/coca-cola.com", List.of("Coca-Cola", "Pepsi", "Fanta", "Sprite"), "Coca-Cola"));
            pool.add(new LogoQuizDTO("https://logo.clearbit.com/disney.com", List.of("Disney", "Pixar", "Dreamworks", "Universal"), "Disney"));
            pool.add(new LogoQuizDTO("https://logo.clearbit.com/lego.com", List.of("LEGO", "Mattel", "Hasbro", "Playmobil"), "LEGO"));
            
            // Level 3-4
            pool.add(new LogoQuizDTO("https://logo.clearbit.com/spotify.com", List.of("Spotify", "Deezer", "Tidal", "Pandora"), "Spotify"));
            pool.add(new LogoQuizDTO("https://logo.clearbit.com/instagram.com", List.of("Instagram", "TikTok", "Snapchat", "Pinterest"), "Instagram"));
            pool.add(new LogoQuizDTO("https://logo.clearbit.com/visa.com", List.of("Visa", "Mastercard", "Amex", "PayPal"), "Visa"));
            pool.add(new LogoQuizDTO("https://logo.clearbit.com/microsoft.com", List.of("Microsoft", "Oracle", "SAP", "Adobe"), "Microsoft"));
            pool.add(new LogoQuizDTO("https://logo.clearbit.com/samsung.com", List.of("Samsung", "LG", "Sony", "Panasonic"), "Samsung"));
            pool.add(new LogoQuizDTO("https://logo.clearbit.com/adidas.com", List.of("Adidas", "Nike", "Under Armour", "New Balance"), "Adidas"));
            pool.add(new LogoQuizDTO("https://logo.clearbit.com/paypal.com", List.of("PayPal", "Stripe", "Square", "Zelle"), "PayPal"));
            pool.add(new LogoQuizDTO("https://logo.clearbit.com/twitter.com", List.of("Twitter", "X", "Threads", "Mastodon"), "Twitter"));
            pool.add(new LogoQuizDTO("https://logo.clearbit.com/adobe.com", List.of("Adobe", "Figma", "Canva", "Autodesk"), "Adobe"));
            pool.add(new LogoQuizDTO("https://logo.clearbit.com/intel.com", List.of("Intel", "AMD", "NVIDIA", "Qualcomm"), "Intel"));

            // Level 5+
            for (int i = 0; i < 80; i++) {
                pool.add(new LogoQuizDTO("https://logo.clearbit.com/ibm.com", List.of("IBM", "Oracle", "Cisco", "HP"), "IBM"));
            }
        }
        
        int start = (level - 1) * 10;
        int end = Math.min(start + 10, pool.size());
        if (start >= pool.size()) return pool.subList(0, 10);
        return new ArrayList<>(pool.subList(start, end));
    }


}
