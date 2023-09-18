package com.amor4ti.dailylab.domain.emotion.mongorepo;

import com.amor4ti.dailylab.domain.emotion.entity.MemberEmotion;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface MemberEmotionRepository extends MongoRepository<MemberEmotion, String> {

}
