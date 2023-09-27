package com.amor4ti.dailylab.domain.member.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;

@Getter
@Builder
@AllArgsConstructor
public class UpdateMemberDto {
    private String gender;
    private LocalDate birthday;
}
