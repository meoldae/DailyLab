package com.amor4ti.dailylab.domain.emotion.entity;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.mapping.Field;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Emotion {

    @Id
    private String emotionId;

    @Field(name = "color")
    private String color;

    @Field(name = "name")
    private String name;

    @Field(name = "type")
    private String type;

}
