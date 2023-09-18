package com.amor4ti.dailylab.domain.emotion.service;


import com.amor4ti.dailylab.domain.emotion.dto.request.RegisterMemberEmotionDto;
import com.amor4ti.dailylab.domain.emotion.entity.MemberEmotion;
import com.amor4ti.dailylab.domain.emotion.mongorepo.EmotionRepository;
import com.amor4ti.dailylab.domain.emotion.entity.Emotion;
import com.amor4ti.dailylab.domain.emotion.mongorepo.MemberEmotionRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

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

        log.info("memberId={}", memberId);
        MemberEmotion memberEmotion = MemberEmotion.builder()
                                           .memberId(memberId)
                                           .emotionId(requestDto.getEmotionId())
                                           .timestamp(requestDto.getTimeStamp())
                                           .build();

        memberEmotionRepository.save(memberEmotion);
    }
}
