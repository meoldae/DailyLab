package com.amor4ti.dailylab.domain.emotion.service;

import com.amor4ti.dailylab.domain.emotion.dto.request.RegisterMemberEmotionDto;
import com.amor4ti.dailylab.domain.emotion.entity.Emotion;
import com.amor4ti.dailylab.domain.emotion.entity.MemberEmotion;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

public interface EmotionService {
    List<Emotion> getAllEmotion();

    void registerEmotion(Long memberId, RegisterMemberEmotionDto requestDto);

    List<MemberEmotion> getDayEmotion(Long memberId, LocalDate localDate);
}
