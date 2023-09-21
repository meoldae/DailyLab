package com.amor4ti.dailylab.domain.diary.service;

import com.amor4ti.dailylab.domain.diary.dto.response.ResponseDiaryDto;

import java.time.LocalDate;

public interface DiaryService {

    void createDefaultDiary(Long memberId, LocalDate date);
    void createConfirmDiary(Long memberId, LocalDate date);

    ResponseDiaryDto getDiaryOnToday(Long memberId, LocalDate date);

    ResponseDiaryDto getDiaryOnDate(Long memberId, LocalDate date);
}