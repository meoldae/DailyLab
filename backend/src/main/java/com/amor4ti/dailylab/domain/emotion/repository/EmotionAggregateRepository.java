package com.amor4ti.dailylab.domain.emotion.repository;

import com.amor4ti.dailylab.domain.emotion.dto.response.EmotionTotalAggregate;
import com.amor4ti.dailylab.domain.emotion.entity.EmotionAggregate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface EmotionAggregateRepository extends JpaRepository<EmotionAggregate, Long> {
    Optional<List<EmotionAggregate>> findByAgeIdAndGenderAndDateBetween(int ageId, String gender, LocalDate startDate, LocalDate endDate);

    @Query("SELECT new com.amor4ti.dailylab.domain.emotion.dto.response.EmotionTotalAggregate(" +
            "e.date, " +
            "SUM(e.absurdCount), " +
            "SUM(e.angerCount), " +
            "SUM(e.annoyCount), " +
            "SUM(e.comfortCount), " +
            "SUM(e.depressionCount), " +
            "SUM(e.excitedCount), " +
            "SUM(e.happyCount), " +
            "SUM(e.joyCount), " +
            "SUM(e.movedCount), " +
            "SUM(e.panicCount), " +
            "SUM(e.proudCount), " +
            "SUM(e.sadCount), " +
            "SUM(e.stuffyCount), " +
            "SUM(e.thankfulCount), " +
            "SUM(e.tiredCount) " +
            ") " +
            "FROM EmotionAggregate e " +
            "WHERE e.date BETWEEN :startDate AND :endDate " +
            "GROUP BY e.date " +
            "ORDER BY e.date ASC")
    Optional<List<EmotionTotalAggregate>> getEmotionsTotalAggregate(LocalDate startDate, LocalDate endDate);
}
