package com.amor4ti.dailylab.domain.member.dto;

import com.querydsl.core.annotations.QueryProjection;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Getter
@NoArgsConstructor
public class MemberInfoDto {

    private Long memberId;
    private String username;
    private String gender;
    private LocalDate birthday;

    private String job;
    private String religion;

    private String typeA;
    private String typeB;
    private String typeC;
    private String typeD;

    @Builder
    @QueryProjection
    public MemberInfoDto(Long memberId, String username, String gender, LocalDate birthday, String job, String religion, String typeA, String typeB, String typeC, String typeD) {
        this.memberId = memberId;
        this.username = username;
        this.gender = gender;
        this.birthday = birthday;
        this.job = job;
        this.religion = religion;
        this.typeA = typeA;
        this.typeB = typeB;
        this.typeC = typeC;
        this.typeD = typeD;
    }
}
