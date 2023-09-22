package com.amor4ti.dailylab.domain.emotion.dto.response;

import com.amor4ti.dailylab.domain.emotion.entity.MemberEmotion;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class MemberEmotionDayDto {

    private int emotionId;
    private String type;
    private String timeStamp;

}
