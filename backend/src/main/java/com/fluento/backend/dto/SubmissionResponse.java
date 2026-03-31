package com.fluento.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SubmissionResponse {
    private boolean correct;
    private int xpEarned;
    private int level;
    private int xp;
    private String feedback;
    private String corrected;
    private String improved;
}
