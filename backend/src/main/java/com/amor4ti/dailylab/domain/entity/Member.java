package com.amor4ti.dailylab.domain.entity;

import java.time.LocalDate;
import java.time.LocalDateTime;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.PrePersist;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Member {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long memberId;
	private String email;
	private String username;
	private String gender;
	private LocalDate birthday;
	private LocalDateTime joinDate;
	private LocalDateTime exitDate;
	private String provider;
	private short mbtiId;
	private String job;
	private String goal;
	private String religion;

	@Builder
	public Member(String email, String username, String provider){
		this.email = email;
		this.username = username;
		this.provider = provider;
	}

	@PrePersist
	public void setJoinDate() {
		this.joinDate = LocalDateTime.now();
	}

	public void setGender(String gender) {
		this.gender = gender;
	}

	public void setBirthday(LocalDate birthday) {
		this.birthday = birthday;
	}

	public void setMbtiId(short mbtiId) {
		this.mbtiId = mbtiId;
	}

	public void setJob(String job) {
		this.job = job;
	}

	public void setGoal(String goal) {
		this.goal = goal;
	}

	public void setReligion(String religion) {
		this.religion = religion;
	}
}
