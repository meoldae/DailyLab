package com.amor4ti.dailylab.domain.emotion.dto.response;

import com.amor4ti.dailylab.domain.emotion.entity.EmotionAggregate;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
public class EmotionAggregateCount {
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

    public static EmotionAggregateCount of(EmotionAggregate emotionAggregate) {
        return EmotionAggregateCount.builder()
                .movedCount(emotionAggregate.getMovedCount())
                .angerCount(emotionAggregate.getAngerCount())
                .absurdCount(emotionAggregate.getAbsurdCount())
                .joyCount(emotionAggregate.getJoyCount())
                .happyCount(emotionAggregate.getHappyCount())
                .proudCount(emotionAggregate.getProudCount())
                .excitedCount(emotionAggregate.getExcitedCount())
                .thankfulCount(emotionAggregate.getThankfulCount())
                .comfortCount(emotionAggregate.getComfortCount())
                .stuffyCount(emotionAggregate.getStuffyCount())
                .depressionCount(emotionAggregate.getDepressionCount())
                .sadCount(emotionAggregate.getSadCount())
                .panicCount(emotionAggregate.getPanicCount())
                .annoyCount(emotionAggregate.getAnnoyCount())
                .tiredCount(emotionAggregate.getTiredCount())
                .build();
    }
}
