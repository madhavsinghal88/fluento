package com.fluento.backend.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CorrectionRequest {
    @NotBlank(message = "Sentence cannot be blank")
    private String sentence;
}
