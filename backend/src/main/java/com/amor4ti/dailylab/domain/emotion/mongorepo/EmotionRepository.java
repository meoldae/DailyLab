package com.amor4ti.dailylab.domain.emotion.mongorepo;

import com.amor4ti.dailylab.domain.emotion.entity.Emotion;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

public interface EmotionRepository extends MongoRepository<Emotion, Long> {
    Emotion findByEmotionId(int mostEmotionId);
}
