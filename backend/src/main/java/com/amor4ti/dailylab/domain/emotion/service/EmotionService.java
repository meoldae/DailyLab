package com.amor4ti.dailylab.domain.emotion.service;

import com.amor4ti.dailylab.domain.emotion.dto.request.RegisterMemberEmotionDto;
import com.amor4ti.dailylab.domain.emotion.dto.response.*;
import com.amor4ti.dailylab.domain.emotion.entity.Emotion;

import java.time.LocalDate;
import java.util.List;

public interface EmotionService {
    List<Emotion> getAllEmotion();

    void registerEmotion(RegisterMemberEmotionDto requestDto);

    List<MemberEmotionDayDto> getDayEmotion(Long memberId, String date);

    List<MemberEmotionPeriodDto> getEmotionsBetweenDates(Long memberId, String startDate, String endDate);

    List<ResponseEmotionAggregate> getEmotionsAggregate(Long memberId, LocalDate startDate, LocalDate endDate);

    void updateEmotionsAggregate(String date);

    List<ResponseEmotionAggregate> getEmotionsTotalAggregate(Long memberId, LocalDate startDate, LocalDate endDate);

    List<EmotionPercentageDto> getDayPercentageEmotion(Long memberId, String date);
}
