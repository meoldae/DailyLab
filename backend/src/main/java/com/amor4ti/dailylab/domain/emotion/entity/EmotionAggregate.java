package com.amor4ti.dailylab.domain.emotion.entity;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.time.LocalDate;

@Entity
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class EmotionAggregate {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDate date;
    private Integer ageId;
    private String gender;

    private Long movedCount;
    private Long angerCount;
    private Long absurdCount;
    private Long joyCount;
    private Long happyCount;
    private Long proudCount;
    private Long excitedCount;
    private Long thankfulCount;
    private Long comfortCount;
    private Long stuffyCount;
    private Long depressionCount;
    private Long sadCount;
    private Long panicCount;
    private Long annoyCount;
    private Long tiredCount;
}
