package com.amor4ti.dailylab.domain.emotion.dto.response;

import lombok.Data;

@Data
public class EmotionCount {
    private String emotionId;
    private String type;
    private Long count;

    public void increment() {
        this.count++;
    }
}
