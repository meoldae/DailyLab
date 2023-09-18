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

    public void registerEmotion(RegisterMemberEmotionDto requestDto) {
        MemberEmotion value = MemberEmotion.builder()
                                           .memberId(1)
                                           .emotionId(requestDto.getEmotionId())
                                           .timestamp(requestDto.getTimeStamp())
                                           .build();
        memberEmotionRepository.save(value);
    }
}
