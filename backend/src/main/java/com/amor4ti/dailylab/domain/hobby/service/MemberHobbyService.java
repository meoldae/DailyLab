package com.amor4ti.dailylab.domain.hobby.service;

import com.amor4ti.dailylab.domain.entity.Hobby;

import java.util.List;

public interface MemberHobbyService {

    List<Hobby> getHobbyListByMemberId(Long memberId);
}
