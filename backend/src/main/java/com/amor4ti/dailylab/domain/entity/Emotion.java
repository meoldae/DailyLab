package com.amor4ti.dailylab.domain.entity;

import lombok.AccessLevel;
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

    @Field(name = "name")
    private String name;

    @Field(name = "type")
    private String type;
}
