package com.amor4ti.dailylab.domain.emotion.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDate;

@Data
@AllArgsConstructor
public class EmotionTotalAggregate {
    private LocalDate date;
    private Long absurdCount;
    private Long angerCount;
    private Long annoyCount;
    private Long comfortCount;
    private Long depressionCount;
    private Long excitedCount;
    private Long happyCount;
    private Long joyCount;
    private Long movedCount;
    private Long panicCount;
    private Long proudCount;
    private Long sadCount;
    private Long stuffyCount;
    private Long thankfulCount;
    private Long tiredCount;
}
