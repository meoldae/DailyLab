package com.amor4ti.dailylab.domain.emotion.mongorepo;

import com.amor4ti.dailylab.domain.emotion.entity.MemberEmotion;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface MemberEmotionRepository extends MongoRepository<MemberEmotion, String> {
    List<MemberEmotion> findByMemberIdAndTimestampBetween(Long memberId, LocalDateTime startDate, LocalDateTime endDate);
}
