package com.amor4ti.dailylab.domain.emotion.repository;

import com.amor4ti.dailylab.domain.entity.Emotion;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmotionRepository extends JpaRepository<Emotion, Long> {
}
