package com.fluento.backend.controller;

import com.fluento.backend.dto.ClassroomRoom;
import com.fluento.backend.service.ClassroomService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

import java.util.Map;

@Controller
@RequiredArgsConstructor
@Slf4j
public class ClassroomWSController {

    private final ClassroomService classroomService;
    private final SimpMessagingTemplate messagingTemplate;

    @MessageMapping("/room/{code}/start")
    public void startQuiz(@DestinationVariable String code) {
        ClassroomRoom room = classroomService.getRoom(code);
        if (room != null && "WAITING".equals(room.getStatus())) {
            room.setStatus("LIVE");
            room.setCurrentQuestionIndex(0);
            
            // Broadcast start + first question
            messagingTemplate.convertAndSend("/topic/room/" + code, (Object) Map.of(
                "type", "QUIZ_STARTED",
                "question", room.getQuestions().get(0),
                "room", room
            ));
            log.info("Quiz started in room: {}", code);
        }
    }

    @MessageMapping("/room/{code}/answer")
    public void submitAnswer(
            @DestinationVariable String code,
            @Payload Map<String, String> payload) {
        
        ClassroomRoom room = classroomService.getRoom(code);
        if (room == null || !"LIVE".equals(room.getStatus())) return;

        String name = payload.get("playerName");
        String answer = payload.get("answer");
        
        room.getPlayers().stream()
                .filter(p -> p.getName().equalsIgnoreCase(name))
                .findFirst()
                .ifPresent(p -> {
                    String correctAnswer = room.getQuestions().get(room.getCurrentQuestionIndex()).getAnswer();
                    if (correctAnswer.equalsIgnoreCase(answer)) {
                        p.setScore(p.getScore() + 10);
                    }
                    
                    // Broadcast leaderboard update
                    messagingTemplate.convertAndSend("/topic/room/" + code, (Object) Map.of(
                        "type", "LEADERBOARD_UPDATE",
                        "players", room.getPlayers()
                    ));
                });
    }

    @MessageMapping("/room/{code}/next")
    public void nextQuestion(@DestinationVariable String code) {
        ClassroomRoom room = classroomService.getRoom(code);
        if (room != null && "LIVE".equals(room.getStatus())) {
            int nextIdx = room.getCurrentQuestionIndex() + 1;
            if (nextIdx < room.getQuestions().size()) {
                room.setCurrentQuestionIndex(nextIdx);
                messagingTemplate.convertAndSend("/topic/room/" + code, (Object) Map.of(
                    "type", "NEW_QUESTION",
                    "question", room.getQuestions().get(nextIdx),
                    "index", nextIdx
                ));
            } else {
                room.setStatus("FINISHED");
                messagingTemplate.convertAndSend("/topic/room/" + code, (Object) Map.of("type", "QUIZ_FINISHED"));
            }
        }
    }
}
