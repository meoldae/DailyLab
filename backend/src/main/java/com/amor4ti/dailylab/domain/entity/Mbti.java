package com.amor4ti.dailylab.domain.entity;


import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.Id;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Mbti {

    @Id
    private Long mbtiId;

    private String typeA;
    private String typeB;
    private String typeC;
    private String typeD;
}
