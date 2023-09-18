package com.amor4ti.dailylab.domain.member.dto;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;

@Getter
@Builder
public class MainMemberDto {

    private String username;
    private String gender;
    private LocalDate birthday;
    private short mbtiId;
    private String job;
    private String goal;
    private String religion;
}
