package com.amor4ti.dailylab.domain.emotion.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class EmotionDetail {
    private Integer emotionId;
    private String timestamp;
}
