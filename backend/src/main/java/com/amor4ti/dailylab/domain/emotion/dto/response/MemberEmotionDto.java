package com.amor4ti.dailylab.domain.emotion.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
public class MemberEmotionDto {

    private int emotionId;
    private String date;
    private String timeStamp;
}
