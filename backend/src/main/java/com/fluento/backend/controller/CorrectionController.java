package com.fluento.backend.controller;

import com.fluento.backend.dto.CorrectionRequest;
import com.fluento.backend.dto.CorrectionResponse;
import com.fluento.backend.service.CorrectionService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/correct")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class CorrectionController {

    private final CorrectionService correctionService;

    @PostMapping
    public ResponseEntity<CorrectionResponse> correct(@Valid @RequestBody CorrectionRequest request) {
        return ResponseEntity.ok(correctionService.correctSentence(request.getSentence()));
    }
}
