package com.amor4ti.dailylab.domain.emotion.service;

import com.amor4ti.dailylab.domain.emotion.dto.request.RegisterMemberEmotionDto;
import com.amor4ti.dailylab.domain.emotion.dto.response.EmotionAggregateCount;
import com.amor4ti.dailylab.domain.emotion.dto.response.MemberEmotionDayDto;
import com.amor4ti.dailylab.domain.emotion.dto.response.MemberEmotionPeriodDto;
import com.amor4ti.dailylab.domain.emotion.dto.response.ResponseEmotionAggregate;
import com.amor4ti.dailylab.domain.emotion.entity.Emotion;

import java.time.LocalDate;
import java.util.List;

public interface EmotionService {
    List<Emotion> getAllEmotion();

    void registerEmotion(RegisterMemberEmotionDto requestDto);

    List<MemberEmotionDayDto> getDayEmotion(Long memberId, String date);

    List<MemberEmotionPeriodDto> getEmotionsBetweenDates(Long memberId, String startDate, String endDate);

<<<<<<< HEAD
    List<ResponseEmotionAggregate> getEmotionsAggregate(Long memberId, LocalDate startDate, LocalDate endDate);

    void updateEmotionsAggregate(String date);
=======
>>>>>>> 8e2f38efb5bc86817e4d1d5872210020af8b9fd3
}
