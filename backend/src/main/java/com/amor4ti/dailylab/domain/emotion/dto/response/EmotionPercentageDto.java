package com.amor4ti.dailylab.domain.emotion.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
public class EmotionPercentageDto {
    private Integer emotionId;
    private Integer percentage;
}
