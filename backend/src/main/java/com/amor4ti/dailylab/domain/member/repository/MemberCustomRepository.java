package com.amor4ti.dailylab.domain.member.repository;

import com.amor4ti.dailylab.domain.member.dto.MemberInfoDto;

public interface MemberCustomRepository {

    MemberInfoDto findMemberInfoDtoByMemberId(Long memberId);

}
