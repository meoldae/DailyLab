package com.amor4ti.dailylab.domain.member.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;

@Getter
@Builder
@AllArgsConstructor
public class MyPageDto {
    private String username;
    private String gender;
    private LocalDate birthday;
    private String provider;
}