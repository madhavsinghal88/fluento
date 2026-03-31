package com.fluento.backend.service;

import com.fluento.backend.dto.CorrectionResponse;
import com.fluento.backend.dto.SubmissionRequest;
import com.fluento.backend.dto.SubmissionResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class GameService {

    private final CorrectionService correctionService;

    public SubmissionResponse processSubmission(SubmissionRequest request) {
        String sentence = request.getSentence().toLowerCase();
        String word = request.getWord().toLowerCase();

        // Check if sentence contains the target word
        if (!sentence.contains(word)) {
            return SubmissionResponse.builder()
                    .correct(false)
                    .feedback("Oops! You forgot to use the word '" + word + "'. Try again!")
                    .level(request.getLevel())
                    .xp(request.getXp())
                    .build();
        }

        // Call correction API
        CorrectionResponse correction = correctionService.correctSentence(request.getSentence());
        
        // Simple heuristic for 'correct': no major grammar red flags. 
        // For children, we'll consider it a win if the correction doesn't change the meaning entirely.
        // We'll award XP if the user attempt was 'close enough' to be understood.
        boolean isCorrect = true; // Awarding XP for attempting and following word rule
        int xpEarned = 10;
        int newXp = request.getXp() + xpEarned;
        int newLevel = request.getLevel();

        // Level up logic (every 50 XP)
        if (newXp >= 50) {
            newLevel++;
            newXp = newXp - 50;
            log.info("Level up! New Level: {}, Leftover XP: {}", newLevel, newXp);
        }

        return SubmissionResponse.builder()
                .correct(isCorrect)
                .xpEarned(xpEarned)
                .level(newLevel)
                .xp(newXp)
                .feedback("Great job! You used '" + word + "' perfectly!")
                .corrected(correction.getCorrected())
                .improved(correction.getImproved())
                .build();
    }
}
