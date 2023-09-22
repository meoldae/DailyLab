package com.amor4ti.dailylab.domain.member.dto;

import com.amor4ti.dailylab.domain.entity.MemberStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;

@Data
@Builder
@AllArgsConstructor
public class MemberStatusDto {
    private LocalDate date;
    private String status;

    public static MemberStatusDto of(MemberStatus memberStatus) {
        return MemberStatusDto.builder()
                .date(memberStatus.getDate())
                .status(memberStatus.getStatus())
                .build();
    }
}
