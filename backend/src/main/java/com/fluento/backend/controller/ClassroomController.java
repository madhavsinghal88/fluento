package com.fluento.backend.controller;

import com.fluento.backend.dto.ClassroomRoom;
import com.fluento.backend.service.ClassroomService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/room")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class ClassroomController {

    private final ClassroomService classroomService;

    @PostMapping("/create")
    public ResponseEntity<Map<String, String>> createRoom(@RequestParam String teacherId) {
        String code = classroomService.createRoom(teacherId);
        return ResponseEntity.ok(Map.of("roomCode", code));
    }

    @PostMapping("/join")
    public ResponseEntity<Map<String, Object>> joinRoom(
            @RequestParam String roomCode,
            @RequestParam String name,
            @RequestParam String avatar) {
        boolean success = classroomService.joinRoom(roomCode, name, avatar);
        return ResponseEntity.ok(Map.of("success", success));
    }

    @GetMapping("/{code}")
    public ResponseEntity<ClassroomRoom> getRoom(@PathVariable String code) {
        ClassroomRoom room = classroomService.getRoom(code);
        return room != null ? ResponseEntity.ok(room) : ResponseEntity.notFound().build();
    }
}
