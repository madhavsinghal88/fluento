package com.fluento.backend.controller;

import com.fluento.backend.dto.*;
import com.fluento.backend.service.CorrectionService;
import com.fluento.backend.service.DailyWordsService;
import com.fluento.backend.service.GameService;
import com.fluento.backend.service.HintService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class GameController {

    private final DailyWordsService dailyWordsService;
    private final GameService gameService;
    private final HintService hintService;

    @GetMapping("/words")
    public ResponseEntity<Map<String, List<WordDTO>>> getWords(@RequestParam(defaultValue = "1") int level) {
        return ResponseEntity.ok(Map.of("words", dailyWordsService.getWordsByLevel(level)));
    }

    @PostMapping("/submit")
    public ResponseEntity<SubmissionResponse> submit(@RequestBody SubmissionRequest request) {
        return ResponseEntity.ok(gameService.processSubmission(request));
    }

    @PostMapping("/hint")
    public ResponseEntity<HintResponse> getHint(@RequestBody HintRequest request) {
        String hintText = hintService.generateHint(request.getWord());
        return ResponseEntity.ok(HintResponse.builder().hint(hintText).build());
    }
}
