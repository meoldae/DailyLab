package com.amor4ti.dailylab.domain.entity;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.*;

import com.amor4ti.dailylab.domain.diary.entity.DiaryPredict;
import com.amor4ti.dailylab.domain.member.dto.UpdateMemberDto;
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

	@OneToMany(mappedBy = "member")
	private List<Todo> todos = new ArrayList<>();

	@OneToMany(mappedBy = "member")
	private List<TodoReport> todoReports = new ArrayList<>();

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

	public void updateMember(UpdateMemberDto updateMemberDto){
		if (updateMemberDto.getMbtiId() != 0) this.mbtiId = updateMemberDto.getMbtiId();
		if (updateMemberDto.getJob() != null) this.job = updateMemberDto.getJob();
		if (updateMemberDto.getGoal() != null) this.goal = updateMemberDto.getGoal();
		if (updateMemberDto.getReligion() != null) this.religion = updateMemberDto.getReligion();
	}
}
