package com.amor4ti.dailylab.domain.entity;


import lombok.*;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Mbti {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long mbtiId;

    private Integer typeA;
    private Integer typeB;
    private Integer typeC;
    private Integer typeD;
}
