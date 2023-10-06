package com.amor4ti.dailylab.domain.emotion.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;
import java.util.List;

@Getter
@Builder
@AllArgsConstructor
public class ResponseEmotionAggregate {
    private LocalDate date;
    private EmotionAggregateCount emotions;
}
