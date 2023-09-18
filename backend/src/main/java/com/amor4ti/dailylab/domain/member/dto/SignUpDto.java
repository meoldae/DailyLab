package com.amor4ti.dailylab.domain.member.dto;

import com.amor4ti.dailylab.domain.entity.Member;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class SignUpDto {

	private Long memberId;
	private String gender;
	private short mbtiId;
	private String job;
	private String goal;
	private String religion;

	public void modifyMember(Member updateMember){
		updateMember.setGender(this.gender);
		updateMember.setMbtiId(this.mbtiId);
		updateMember.setJob(this.job);
		updateMember.setGoal(this.goal);
		updateMember.setReligion(this.religion);
	}
}
