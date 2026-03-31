package com.fluento.backend.controller;

import com.fluento.backend.dto.LogoQuizDTO;
import com.fluento.backend.service.LogoQuizService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/quiz/logos")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class LogoQuizController {

    private final LogoQuizService logoQuizService;

    @GetMapping
    public ResponseEntity<Map<String, List<LogoQuizDTO>>> getLogoQuiz(
            @RequestParam(defaultValue = "companies") String type,
            @RequestParam(defaultValue = "1") int level,
            @RequestParam(defaultValue = "8") int age) {
        return ResponseEntity.ok(Map.of("questions", logoQuizService.getLogoQuiz(type, level, age)));
    }
}
