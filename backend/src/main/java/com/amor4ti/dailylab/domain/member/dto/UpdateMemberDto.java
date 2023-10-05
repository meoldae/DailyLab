package com.amor4ti.dailylab.domain.member.dto;

import com.amor4ti.dailylab.domain.entity.Hobby;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
@AllArgsConstructor
public class UpdateMemberDto {
    private Long mbtiId;
    private String job;
    private String goal;
    private String religion;
    private List<Hobby> hobbyList;
}
