package com.fluento.backend.controller;

import com.fluento.backend.model.Child;
import com.fluento.backend.model.ChildRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/child")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class ChildController {

    private final ChildRepository childRepository;

    @PostMapping("/login")
    public ResponseEntity<Child> login(@RequestBody Child childRequest) {
        return childRepository.findByName(childRequest.getName())
                .map(ResponseEntity::ok)
                .orElseGet(() -> {
                    childRequest.setTotalXp(0);
                    childRequest.setCurrentLevel(1);
                    childRequest.setTotalQuestions(0);
                    childRequest.setCorrectAnswers(0);
                    childRequest.setAccuracy(0.0);
                    return ResponseEntity.ok(childRepository.save(childRequest));
                });
    }

    @PostMapping("/progress")
    public ResponseEntity<Child> updateProgress(@RequestBody Child childRequest) {
        // Legacy endpoint (Deprecated - Keeping for standard fallback)
        return childRepository.findById(childRequest.getId())
                .map(existing -> {
                    existing.setTotalXp(childRequest.getTotalXp());
                    existing.setCurrentLevel(childRequest.getCurrentLevel());
                    existing.setTotalQuestions(childRequest.getTotalQuestions());
                    existing.setCorrectAnswers(childRequest.getCorrectAnswers());
                    
                    if (existing.getTotalQuestions() != null && existing.getTotalQuestions() > 0) {
                        double acc = (double) existing.getCorrectAnswers() / existing.getTotalQuestions() * 100.0;
                        existing.setAccuracy(Math.round(acc * 10.0) / 10.0);
                    } else {
                        existing.setAccuracy(0.0);
                    }
                    
                    return ResponseEntity.ok(childRepository.save(existing));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/{id}/score")
    public ResponseEntity<Child> addScore(@PathVariable Long id, @RequestParam boolean correct, @RequestParam(defaultValue = "10") int xpAward) {
        // Secure Anti-Cheat Endpoint: Server computes everything.
        return childRepository.findById(id).map(existing -> {
            int currentXp = existing.getTotalXp() != null ? existing.getTotalXp() : 0;
            int totalQ = existing.getTotalQuestions() != null ? existing.getTotalQuestions() : 0;
            int curC = existing.getCorrectAnswers() != null ? existing.getCorrectAnswers() : 0;
            
            totalQ++;
            if (correct) {
                currentXp += xpAward;
                curC++;
            }
            
            existing.setTotalXp(currentXp);
            existing.setCurrentLevel((currentXp / 50) + 1);
            existing.setTotalQuestions(totalQ);
            existing.setCorrectAnswers(curC);
            
            double acc = (double) curC / totalQ * 100.0;
            existing.setAccuracy(Math.round(acc * 10.0) / 10.0);
            
            return ResponseEntity.ok(childRepository.save(existing));
        }).orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/leaderboard")
    public ResponseEntity<java.util.List<Child>> getLeaderboard() {
        return ResponseEntity.ok(childRepository.findAllByOrderByTotalXpDesc());
    }
}
