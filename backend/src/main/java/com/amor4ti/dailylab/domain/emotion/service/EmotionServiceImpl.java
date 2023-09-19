package com.amor4ti.dailylab.domain.emotion.service;


import com.amor4ti.dailylab.domain.emotion.dto.request.RegisterMemberEmotionDto;
import com.amor4ti.dailylab.domain.emotion.dto.response.MemberEmotionDto;
import com.amor4ti.dailylab.domain.emotion.entity.MemberEmotion;
import com.amor4ti.dailylab.domain.emotion.mongorepo.EmotionRepository;
import com.amor4ti.dailylab.domain.emotion.entity.Emotion;
import com.amor4ti.dailylab.domain.emotion.mongorepo.MemberEmotionRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class EmotionServiceImpl implements EmotionService {

    private final EmotionRepository emotionRepository;
    private final MemberEmotionRepository memberEmotionRepository;

    public List<Emotion> getAllEmotion() {
        return emotionRepository.findAll();
    }

    public void registerEmotion(Long memberId, RegisterMemberEmotionDto requestDto) {
        String[] dates = requestDto.getTimeStamp().split(" ");

        MemberEmotion memberEmotion = MemberEmotion.builder()
                                           .memberId(memberId)
                                           .emotionId(requestDto.getEmotionId())
                                           .date(dates[0])
                                           .timestamp(dates[1])
                                           .build();

        memberEmotionRepository.save(memberEmotion);
    }

    public List<MemberEmotionDto> getDayEmotion(Long memberId, String date) {
        List<MemberEmotion> memberEmotions = memberEmotionRepository.findByMemberIdAndDate(memberId, date);

        return memberEmotions.stream()
                .map(MemberEmotionDto::of)
                .collect(Collectors.toList());
    }
}
