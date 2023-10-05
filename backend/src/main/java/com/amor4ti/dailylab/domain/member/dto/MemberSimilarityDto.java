package com.amor4ti.dailylab.domain.member.dto;

import java.time.LocalDate;
import java.util.List;

import lombok.Builder;
import lombok.Getter;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Getter
public class MemberSimilarityDto {
	private Long memberId;
	private int ageGroup;
	private String gender;
	private int mbtiA;
	private int mbtiB;
	private int mbtiC;
	private int mbtiD;
	private int job;
	private int religion;
	private List<Integer> hobbyList;

	@Builder
	public MemberSimilarityDto(Long memberId, String gender, LocalDate birthday, int mbtiA, int mbtiB, int mbtiC, int mbtiD, String job, String religion) {
		this.memberId = memberId;
		this.ageGroup = getAgeGroup(birthday);
		this.gender = gender;
		this.mbtiA = mbtiA;
		this.mbtiB = mbtiB;
		this.mbtiC = mbtiC;
		this.mbtiD = mbtiD;


		if (job != null) {
			switch (job) {
				case "학생": this.job = 1; break;
				case "무직": this.job = 2; break;
				case "직장인": this.job = 3; break;
			}
		}else this.job = 0;

		if (religion != null) {
			switch (religion) {
				case "무교": this.religion = 1; break;
				case "기독교": this.religion = 2; break;
				case "불교": this.religion = 3; break;
				case "천주교": this.religion = 4; break;
				case "이슬람교": this.religion = 5; break;
				case "힌두교": this.religion = 6; break;
				case "원불교": this.religion = 7; break;
			}
		}else this.religion = 0;
	}

	public int getAgeGroup(LocalDate birthday) {
		return (LocalDate.now().getYear() - birthday.getYear()) / 10;
	}

	public void setHobbyList(List hobbyList){
		this.hobbyList = hobbyList;
	}
}