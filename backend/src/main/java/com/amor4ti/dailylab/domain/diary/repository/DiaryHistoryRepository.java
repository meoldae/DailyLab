package com.amor4ti.dailylab.domain.diary.repository;

import com.amor4ti.dailylab.domain.diary.entity.DiaryHistory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.Optional;

public interface DiaryHistoryRepository extends JpaRepository<DiaryHistory, Long> {
    Optional<DiaryHistory> findByMemberIdAndDiaryDate(Long memberId, LocalDate date);
}
