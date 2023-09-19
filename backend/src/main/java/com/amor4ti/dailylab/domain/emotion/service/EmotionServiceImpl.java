package com.amor4ti.dailylab.domain.emotion.service;


import com.amor4ti.dailylab.domain.emotion.dto.request.RegisterMemberEmotionDto;
import com.amor4ti.dailylab.domain.emotion.entity.MemberEmotion;
import com.amor4ti.dailylab.domain.emotion.mongorepo.EmotionRepository;
import com.amor4ti.dailylab.domain.emotion.entity.Emotion;
import com.amor4ti.dailylab.domain.emotion.mongorepo.MemberEmotionRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

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

    public List<MemberEmotion> getDayEmotion(Long memberId, LocalDate localDate) {
        LocalDateTime startOfDay = localDate.atStartOfDay();
        LocalDateTime endOfDay = localDate.atTime(23, 59, 59, 999999999);
        return memberEmotionRepository.findByMemberIdAndTimestampBetween(memberId, startOfDay, endOfDay);
    }
}
