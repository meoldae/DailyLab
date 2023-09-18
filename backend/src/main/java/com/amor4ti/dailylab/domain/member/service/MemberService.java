package com.amor4ti.dailylab.domain.member.service;

import javax.servlet.http.HttpServletResponse;

import com.amor4ti.dailylab.domain.entity.Member;
import com.amor4ti.dailylab.domain.member.dto.MainMemberDto;
import com.amor4ti.dailylab.domain.member.dto.SignUpDto;
import com.amor4ti.dailylab.domain.member.dto.UpdateMemberDto;
import com.amor4ti.dailylab.global.response.CommonResponse;
import com.amor4ti.dailylab.global.response.DataResponse;

public interface MemberService {

	DataResponse<String> saveMember(SignUpDto signUpDto, HttpServletResponse response);

    DataResponse<MainMemberDto> getMainMemberDto(Long memberId);

    CommonResponse updateMemberInfo(Long memberId, UpdateMemberDto updateMemberDto);

    DataResponse getHobbyList(Long memberId);
}
