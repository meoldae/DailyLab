package com.amor4ti.dailylab.domain.diary.repository;

import com.amor4ti.dailylab.domain.diary.entity.DiaryPredict;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.Optional;

public interface DiaryPredictRepository extends JpaRepository<DiaryPredict, Long> {
    Optional<DiaryPredict> findByMemberIdAntDate(Long memberId, LocalDate date);
}
