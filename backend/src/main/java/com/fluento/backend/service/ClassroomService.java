package com.fluento.backend.service;

import com.fluento.backend.dto.ClassroomPlayer;
import com.fluento.backend.dto.ClassroomRoom;
import com.fluento.backend.dto.QuizDTO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.Random;
import java.util.concurrent.ConcurrentHashMap;

@Service
@RequiredArgsConstructor
@Slf4j
public class ClassroomService {

    private final QuizService quizService;
    private final SimpMessagingTemplate messagingTemplate;
    
    // In-memory room store: roomCode -> ClassroomRoom
    private final Map<String, ClassroomRoom> activeRooms = new ConcurrentHashMap<>();
    private final Random random = new Random();

    public String createRoom(String teacherId) {
        String code = generateCode();
        ClassroomRoom room = ClassroomRoom.builder()
                .roomCode(code)
                .teacherId(teacherId)
                .status("WAITING")
                .build();
        
        // Generate 5 AI questions for the live session
        List<QuizDTO> questions = quizService.getQuiz("world", 1, 10);
        room.setQuestions(questions);
        
        activeRooms.put(code, room);
        log.info("Classroom room created: {}", code);
        return code;
    }

    public boolean joinRoom(String code, String name, String avatar) {
        ClassroomRoom room = activeRooms.get(code);
        if (room == null || !"WAITING".equals(room.getStatus())) return false;
        
        // Check for duplicate names
        boolean exists = room.getPlayers().stream().anyMatch(p -> p.getName().equalsIgnoreCase(name));
        if (exists) return false;

        ClassroomPlayer player = ClassroomPlayer.builder()
                .name(name)
                .avatar(avatar)
                .score(0)
                .build();
        
        room.getPlayers().add(player);
        
        // Broadcast join to all in the room
        messagingTemplate.convertAndSend("/topic/room/" + code, (Object) Map.of(
            "type", "PLAYER_JOINED",
            "player", player,
            "allPlayers", room.getPlayers()
        ));
        
        log.info("Player {} joined room {}", name, code);
        return true;
    }

    private String generateCode() {
        String chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < 6; i++) {
            sb.append(chars.charAt(random.nextInt(chars.length())));
        }
        return sb.toString();
    }
    
    public ClassroomRoom getRoom(String code) {
        return activeRooms.get(code);
    }
}
