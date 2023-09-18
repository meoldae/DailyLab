package com.amor4ti.dailylab.domain.hobby.service;

import com.amor4ti.dailylab.domain.entity.Hobby;
import com.amor4ti.dailylab.domain.hobby.repository.MemberHobbyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MemberHobbyServiceImpl implements MemberHobbyService{

    private final MemberHobbyRepository memberHobbyRepository;

    @Override
    public List<Hobby> getHobbyListByMemberId(Long memberId) {
        return memberHobbyRepository.findHobbyListByMemberId(memberId);
    }
}
