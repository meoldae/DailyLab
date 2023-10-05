package com.amor4ti.dailylab.domain.member.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
public class MemberMbtiDto {
    private Integer typeA;
    private Integer typeB;
    private Integer typeC;
    private Integer typeD;
}