package com.amor4ti.dailylab.domain.emotion.entity;

import com.amor4ti.dailylab.domain.emotion.dto.response.EmotionDetail;
import lombok.*;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.persistence.Id;
import java.time.LocalDateTime;
import java.util.List;

@Getter
@Builder
@Document(collection = "member_emotion")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class MemberEmotion {

    @Id
    private String id;

    private Long memberId;
    private String date;
    private List<EmotionDetail> emotions;

    public static MemberEmotion build(Long memberId, String date, List<EmotionDetail> emotions) {
        return MemberEmotion.builder()
                            .memberId(memberId)
                            .date(date)
                            .emotions(emotions)
                            .build();
    }
}
