package com.amor4ti.dailylab.domain.member.repository;

import com.amor4ti.dailylab.domain.member.dto.MemberInfoDto;

import java.util.List;

public interface MemberCustomRepository {

    MemberInfoDto findMemberInfoDtoByMemberId(Long memberId);
    List<Long> findMemberByGenderAndAge(String gender, Integer currentYear, Integer age);

}
