package com.amor4ti.dailylab.domain.member.service;

import com.amor4ti.dailylab.domain.entity.Mbti;
import com.amor4ti.dailylab.domain.member.dto.MemberMbtiDto;
import com.amor4ti.dailylab.global.response.DataResponse;

public interface MbtiService {
    MemberMbtiDto getMbti(Long mbtiId);
    Mbti getMbtiByDto(MemberMbtiDto memberMbtiDto);
}
