package com.amor4ti.dailylab.domain.emotion.mongorepo;

import com.amor4ti.dailylab.domain.emotion.entity.Emotion;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface EmotionRepository extends MongoRepository<Emotion, Long> {
}
