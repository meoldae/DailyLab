package com.amor4ti.dailylab.domain.member.dto;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;

@Getter
@Builder
public class UpdateMemberBasicDto {
    private String gender;
    private LocalDate birthday;
}
