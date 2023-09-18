package com.amor4ti.dailylab.domain.emotion.service;

import com.amor4ti.dailylab.domain.emotion.dto.request.RegisterMemberEmotionDto;
import com.amor4ti.dailylab.domain.emotion.entity.Emotion;

import java.util.List;

public interface EmotionService {
    List<Emotion> getAllEmotion();

    void registerEmotion(Long memberId, RegisterMemberEmotionDto requestDto);
}
