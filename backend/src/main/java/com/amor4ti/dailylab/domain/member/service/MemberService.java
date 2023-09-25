package com.amor4ti.dailylab.domain.member.service;

import javax.servlet.http.HttpServletResponse;

import com.amor4ti.dailylab.domain.entity.Member;
import com.amor4ti.dailylab.domain.member.dto.MainMemberDto;
import com.amor4ti.dailylab.domain.member.dto.MemberMbtiDto;
import com.amor4ti.dailylab.domain.member.dto.SignUpDto;
import com.amor4ti.dailylab.domain.member.dto.UpdateMemberDto;
import com.amor4ti.dailylab.global.response.CommonResponse;
import com.amor4ti.dailylab.global.response.DataResponse;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

public interface MemberService {

	DataResponse<String> saveMember(SignUpDto signUpDto, HttpServletResponse response);

    DataResponse getMemberInfo(Long memberId);
    DataResponse getMainMemberDto(Long memberId);

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

    DataResponse getMemberStatus(Long memberId);

    void updateStatusProceed(Long memberId, LocalDate date);

    void updateStatusWait(Long memberId, LocalDate date);

    void updateStatusFinish(Long memberId, LocalDate date);

    List getProceedMemberList(LocalDate date);

	CommonResponse exitMember(Long memberId);

    List getMemberSimilarityList();

    CommonResponse startMemberStatus(Long memberId, LocalDate date);

    void updateStatusComplete(Long memberId, LocalDate date);

    DataResponse getMemberStatusByRange(Long memberId, Map<String, String> paramMap);
}
