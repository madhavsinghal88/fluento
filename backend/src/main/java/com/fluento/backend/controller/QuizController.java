package com.fluento.backend.controller;

import com.fluento.backend.dto.QuizDTO;
import com.fluento.backend.service.QuizService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/quiz")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class QuizController {

    private final QuizService quizService;

    @GetMapping("/countries")
    public ResponseEntity<Map<String, List<QuizDTO>>> getCountryQuiz(
            @RequestParam(defaultValue = "world") String mode,
            @RequestParam(defaultValue = "1") int level,
            @RequestParam(defaultValue = "8") int age) {
        return ResponseEntity.ok(Map.of("questions", quizService.getQuiz(mode, level, age)));
    }
}
