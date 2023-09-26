package com.amor4ti.dailylab.domain.emotion.repository;

import com.amor4ti.dailylab.domain.emotion.entity.EmotionAggregate;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface EmotionAggregateRepository extends JpaRepository<EmotionAggregate, Long> {
    Optional<List<EmotionAggregate>> findByAgeIdAndGenderAndDateBetween(int ageId, String gender, LocalDate startDate, LocalDate endDate);
}
