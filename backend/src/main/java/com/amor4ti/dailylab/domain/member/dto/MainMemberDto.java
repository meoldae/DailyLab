package com.amor4ti.dailylab.domain.member.dto;

import com.amor4ti.dailylab.domain.entity.Member;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.text.ParsePosition;
import java.time.LocalDate;

@Getter
@Builder
@AllArgsConstructor
public class MainMemberDto {
    private String username;
    private String gender;
    private LocalDate birthday;
    private Long mbtiId;
    private String job;
    private String goal;
    private String religion;
}
