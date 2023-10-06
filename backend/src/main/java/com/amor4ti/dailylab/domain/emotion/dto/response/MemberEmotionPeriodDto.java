package com.amor4ti.dailylab.domain.emotion.dto.response;

import lombok.*;

import java.util.List;

@Data
public class MemberEmotionPeriodDto {
    private String date;
    private List<EmotionCount> emotions;
}
