package com.amor4ti.dailylab.domain.emotion.dto.response;

import lombok.Data;

import java.util.List;

@Data
public class EmotionAggregateDto {
    private Long memberId;
    private String date;
    private List<EmotionDetail> emotions;
}
