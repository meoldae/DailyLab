package com.amor4ti.dailylab.domain.member.dto;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MemberStatusForCalendarDto {
	private LocalDate selectedDate;
	private String status;
	private String colorCode;

	@Builder
	public MemberStatusForCalendarDto(LocalDate selectedDate, String status) {
		this.selectedDate = selectedDate;
		this.status = status;
	}
}
