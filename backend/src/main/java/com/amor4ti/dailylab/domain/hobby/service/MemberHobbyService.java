package com.amor4ti.dailylab.domain.hobby.service;

import com.amor4ti.dailylab.domain.entity.Hobby;
import com.amor4ti.dailylab.domain.hobby.dto.MemberHobbyDto;
import com.amor4ti.dailylab.global.response.CommonResponse;
import com.amor4ti.dailylab.global.response.DataResponse;

import java.util.List;

public interface MemberHobbyService {

    List<Hobby> getHobbyListByMemberId(Long memberId);
    DataResponse getAllHobby();
    CommonResponse registerHobby(Long memberId, MemberHobbyDto memberHobbyDto);
    CommonResponse deleteHobby(Long memberId, String hobbyName);
}
