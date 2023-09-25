package com.amor4ti.dailylab.domain.member.dto;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
@AllArgsConstructor
public class MemberStatusForCalendarDto {
	private LocalDate date;
	private String status;
}
