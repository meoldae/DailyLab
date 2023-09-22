package com.amor4ti.dailylab.domain.hobby.service;

import com.amor4ti.dailylab.domain.entity.Hobby;
import com.amor4ti.dailylab.domain.entity.Member;
import com.amor4ti.dailylab.domain.entity.MemberHobby;
import com.amor4ti.dailylab.domain.hobby.dto.MemberHobbyDto;
import com.amor4ti.dailylab.domain.hobby.repository.HobbyRepository;
import com.amor4ti.dailylab.domain.hobby.repository.MemberHobbyRepository;
import com.amor4ti.dailylab.domain.member.repository.MemberRepository;
import com.amor4ti.dailylab.global.exception.CustomException;
import com.amor4ti.dailylab.global.exception.ExceptionStatus;
import com.amor4ti.dailylab.global.response.CommonResponse;
import com.amor4ti.dailylab.global.response.DataResponse;
import com.amor4ti.dailylab.global.response.ResponseService;
import com.amor4ti.dailylab.global.response.ResponseStatus;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.LinkedList;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class MemberHobbyServiceImpl implements MemberHobbyService{

    private final MemberHobbyRepository memberHobbyRepository;
    private final HobbyRepository hobbyRepository;
    private final MemberRepository memberRepository;
    private final ResponseService responseService;

    @Override
    public List<Hobby> getHobbyListByMemberId(Long memberId) {
        return memberHobbyRepository.findHobbyListByMemberId(memberId);
    }

    @Override
    public DataResponse getAllHobby() {
        List<Hobby> hobbyList = hobbyRepository.findAll();
        return responseService.successDataResponse(ResponseStatus.RESPONSE_SUCCESS, hobbyList);
    }

    @Override
    public CommonResponse registerHobby(Long memberId, Long hobbyId) {
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new CustomException(ExceptionStatus.MEMBER_NOT_FOUND));

        Hobby hobby = hobbyRepository.findById(hobbyId)
                .orElseThrow(() -> new CustomException(ExceptionStatus.HOBBY_NOT_FOUND));

        boolean findHobby = memberHobbyRepository.findMemberHobbyByMember_MemberIdAndHobby_HobbyId(memberId, hobbyId)
                .isPresent();

        if (findHobby) {
            throw new CustomException(ExceptionStatus.MEMBER_HOBBY_IS_ALREADY_PRESENT);
        }

        MemberHobby memberHobby = MemberHobby.builder()
                .member(member)
                .hobby(hobby)
                .build();

        memberHobbyRepository.save(memberHobby);

        return responseService.successResponse(ResponseStatus.HOBBY_REGIST_SUCCESS);
    }

    @Override
    public CommonResponse deleteHobby(Long memberId, Long hobbyId) {
        MemberHobby memberHobby = memberHobbyRepository.findMemberHobbyByMember_MemberIdAndHobby_HobbyId(memberId, hobbyId)
                        .orElseThrow(() -> new CustomException(ExceptionStatus.MEMBER_HOBBY_NOT_FOUND ));

        memberHobbyRepository.delete(memberHobby);

        return responseService.successResponse(ResponseStatus.HOBBY_DELETE_SUCCESS);
    }
}
