package com.fluento.backend.controller;

import com.fluento.backend.dto.WordDTO;
import com.fluento.backend.service.DailyWordsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/daily-words")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class DailyWordsController {

    private final DailyWordsService dailyWordsService;

    @GetMapping
    public ResponseEntity<Map<String, List<WordDTO>>> getDailyWords() {
        return ResponseEntity.ok(Map.of("words", dailyWordsService.getDailyWords()));
    }
}
