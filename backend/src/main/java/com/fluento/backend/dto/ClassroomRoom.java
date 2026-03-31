package com.fluento.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ClassroomRoom {
    private String roomCode;
    private String teacherId;
    private String status; // WAITING, LIVE, FINISHED
    
    @Builder.Default
    private List<ClassroomPlayer> players = new CopyOnWriteArrayList<>();
    
    @Builder.Default
    private List<QuizDTO> questions = new ArrayList<>();
    
    private int currentQuestionIndex = -1;
}
