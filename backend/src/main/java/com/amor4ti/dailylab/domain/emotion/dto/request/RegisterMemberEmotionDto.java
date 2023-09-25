package com.amor4ti.dailylab.domain.emotion.dto.request;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class RegisterMemberEmotionDto {
    private Long memberId;
    private int emotionId;
    private String timeStamp;
}
