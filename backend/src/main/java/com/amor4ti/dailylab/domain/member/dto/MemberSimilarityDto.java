package com.amor4ti.dailylab.domain.member.dto;

import java.time.LocalDate;
import java.util.List;

import lombok.Builder;
import lombok.Getter;

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

		switch (job) {
			case "학생": this.job = 1;
			case "무직": this.job = 2;
			case "직장인": this.job = 3;
			default: this.job = 0;
		}

		switch (religion) {
			case "무교": this.religion = 1;
			case "기독교": this.religion = 2;
			case "불교": this.religion = 3;
			case "천주교": this.religion = 4;
			case "이슬람교": this.religion = 5;
			case "힌두교": this.religion = 6;
			case "원불교": this.religion = 7;
			default: this.religion = 0;
		}
	}

	public int getAgeGroup(LocalDate birthday) {
		return (LocalDate.now().getYear() - birthday.getYear()) / 10;
	}

	public void setHobbyList(List hobbyList){
		this.hobbyList = hobbyList;
	}
}