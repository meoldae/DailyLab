package com.amor4ti.dailylab.domain.emotion.repository;

import com.amor4ti.dailylab.domain.emotion.entity.EmotionAggregate;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmotionAggregateRepository extends JpaRepository<EmotionAggregate, Long> {
}
