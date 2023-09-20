package com.amor4ti.dailylab.domain.diary.service;

import java.time.LocalDate;

public interface DiaryService {

    void createDefaultDiary(Long memberId, LocalDate date);
}