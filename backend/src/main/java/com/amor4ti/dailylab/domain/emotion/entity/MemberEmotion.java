package com.amor4ti.dailylab.domain.emotion.entity;

import lombok.*;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.persistence.Id;
import java.time.LocalDateTime;

@Getter
@Builder
@Document(collection = "member_emotion")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class MemberEmotion {

    @Id
    private String id;

    private Long memberId;
    private int emotionId;
    private String type;
    private String timestamp;
    private String date;
}
