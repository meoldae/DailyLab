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

    @Builder.Default
    private Long movedCount = 0L;

    @Builder.Default
    private Long angerCount = 0L;

    @Builder.Default
    private Long absurdCount = 0L;

    @Builder.Default
    private Long joyCount = 0L;

    @Builder.Default
    private Long happyCount = 0L;

    @Builder.Default
    private Long proudCount = 0L;

    @Builder.Default
    private Long excitedCount = 0L;

    @Builder.Default
    private Long thankfulCount = 0L;

    @Builder.Default
    private Long comfortCount = 0L;

    @Builder.Default
    private Long stuffyCount = 0L;

    @Builder.Default
    private Long depressionCount = 0L;

    @Builder.Default
    private Long sadCount = 0L;

    @Builder.Default
    private Long panicCount = 0L;

    @Builder.Default
    private Long annoyCount = 0L;

    @Builder.Default
    private Long tiredCount = 0L;

    public void setMovedCount(Long movedCount) {
        this.movedCount = movedCount;
    }

    public void setAngerCount(Long angerCount) {
        this.angerCount = angerCount;
    }

    public void setAbsurdCount(Long absurdCount) {
        this.absurdCount = absurdCount;
    }

    public void setJoyCount(Long joyCount) {
        this.joyCount = joyCount;
    }

    public void setHappyCount(Long happyCount) {
        this.happyCount = happyCount;
    }

    public void setProudCount(Long proudCount) {
        this.proudCount = proudCount;
    }

    public void setExcitedCount(Long excitedCount) {
        this.excitedCount = excitedCount;
    }

    public void setThankfulCount(Long thankfulCount) {
        this.thankfulCount = thankfulCount;
    }

    public void setComfortCount(Long comfortCount) {
        this.comfortCount = comfortCount;
    }

    public void setStuffyCount(Long stuffyCount) {
        this.stuffyCount = stuffyCount;
    }

    public void setDepressionCount(Long depressionCount) {
        this.depressionCount = depressionCount;
    }

    public void setSadCount(Long sadCount) {
        this.sadCount = sadCount;
    }

    public void setPanicCount(Long panicCount) {
        this.panicCount = panicCount;
    }

    public void setAnnoyCount(Long annoyCount) {
        this.annoyCount = annoyCount;
    }

    public void setTiredCount(Long tiredCount) {
        this.tiredCount = tiredCount;
    }
}
