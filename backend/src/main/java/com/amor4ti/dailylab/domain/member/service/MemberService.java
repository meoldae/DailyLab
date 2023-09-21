package com.amor4ti.dailylab.domain.member.service;

import javax.servlet.http.HttpServletResponse;

import com.amor4ti.dailylab.domain.entity.Member;
import com.amor4ti.dailylab.domain.member.dto.MainMemberDto;
import com.amor4ti.dailylab.domain.member.dto.MemberMbtiDto;
import com.amor4ti.dailylab.domain.member.dto.SignUpDto;
import com.amor4ti.dailylab.domain.member.dto.UpdateMemberDto;
import com.amor4ti.dailylab.global.response.CommonResponse;
import com.amor4ti.dailylab.global.response.DataResponse;

public interface MemberService {

	DataResponse<String> saveMember(SignUpDto signUpDto, HttpServletResponse response);

    DataResponse<MainMemberDto> getMemberInfo(Long memberId);

    CommonResponse updateMemberInfo(Long memberId, UpdateMemberDto updateMemberDto);

    DataResponse getHobbyList(Long memberId);

    DataResponse getGoal(Long memberId);
    CommonResponse updateGoal(String goal, Long memberId);

    DataResponse getJob(Long memberId);
    CommonResponse updateJob(String job, Long memberId);
    DataResponse getMbti(Long memberId);
    CommonResponse updateMbti(MemberMbtiDto memberMbtiDto, Long memberId);
    DataResponse getReligion(Long memberId);
    CommonResponse updateReligion(String religion, Long memberId);

    DataResponse getMemberFlask(Long memberId);

}
