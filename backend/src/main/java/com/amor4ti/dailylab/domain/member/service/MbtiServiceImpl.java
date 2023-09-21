package com.amor4ti.dailylab.domain.member.service;

import com.amor4ti.dailylab.domain.entity.Mbti;
import com.amor4ti.dailylab.domain.member.dto.MemberMbtiDto;
import com.amor4ti.dailylab.domain.member.mapper.MbtiMapper;
import com.amor4ti.dailylab.domain.member.repository.MbtiRepository;
import com.amor4ti.dailylab.global.exception.CustomException;
import com.amor4ti.dailylab.global.exception.ExceptionStatus;
import com.amor4ti.dailylab.global.response.DataResponse;
import com.amor4ti.dailylab.global.response.ResponseService;
import com.amor4ti.dailylab.global.response.ResponseStatus;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MbtiServiceImpl implements MbtiService{
    private final ResponseService responseService;
    private final MbtiRepository mbtiRepository;
    private final MbtiMapper mbtiMapper;

    @Override
    public MemberMbtiDto getMbti(Long mbtiId) {
        Mbti mbti = mbtiRepository.findById(mbtiId)
                .orElseThrow(() -> new CustomException(ExceptionStatus.MBTI_NOT_FOUND));
        MemberMbtiDto memberMbtiDto = mbtiMapper.mbtiToMemberMbtiDto(mbti);

        return memberMbtiDto;
    }

    @Override
    public Mbti getMbtiByDto(MemberMbtiDto memberMbtiDto) {
        Mbti mbti = mbtiRepository.findMbtiByTypeAAndTypeBAndTypeCAndTypeD(
                memberMbtiDto.getTypeA(), memberMbtiDto.getTypeB(), memberMbtiDto.getTypeC(), memberMbtiDto.getTypeD())
                .orElseThrow(() -> new CustomException(ExceptionStatus.MBTI_NOT_FOUND));

        return mbti;
    }


}
