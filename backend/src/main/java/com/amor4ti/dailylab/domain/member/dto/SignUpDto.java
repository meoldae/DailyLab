package com.amor4ti.dailylab.domain.member.dto;

import java.time.LocalDate;

import com.amor4ti.dailylab.domain.entity.Member;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class SignUpDto {

	private Long memberId;
	private String gender;
	private LocalDate birthDay;

	public void modifyMember(Member updateMember){
		updateMember.setGender(this.gender);
		updateMember.setBirthday(this.birthDay);
	}
}
