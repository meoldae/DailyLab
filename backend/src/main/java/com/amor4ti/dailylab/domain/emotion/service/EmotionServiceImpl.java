package com.amor4ti.dailylab.domain.emotion.service;


import com.amor4ti.dailylab.domain.emotion.dto.request.RegisterMemberEmotionDto;
import com.amor4ti.dailylab.domain.emotion.dto.response.MemberEmotionDayDto;
import com.amor4ti.dailylab.domain.emotion.dto.response.MemberEmotionPeriodDto;
import com.amor4ti.dailylab.domain.emotion.entity.MemberEmotion;
import com.amor4ti.dailylab.domain.emotion.mongorepo.EmotionRepository;
import com.amor4ti.dailylab.domain.emotion.entity.Emotion;
import com.amor4ti.dailylab.domain.emotion.mongorepo.MemberEmotionRepository;
import com.mongodb.BasicDBObject;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.*;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class EmotionServiceImpl implements EmotionService {

    private final EmotionRepository emotionRepository;
    private final MemberEmotionRepository memberEmotionRepository;
    private final MongoTemplate mongoTemplate;

    public List<Emotion> getAllEmotion() {
        return emotionRepository.findAll();
    }

    public void registerEmotion(Long memberId, RegisterMemberEmotionDto requestDto) {
        String[] dates = requestDto.getTimeStamp().split(" ");

        MemberEmotion memberEmotion = MemberEmotion.builder()
                                           .memberId(memberId)
                                           .emotionId(requestDto.getEmotionId())
                                           .date(dates[0])
                                           .timestamp(dates[1])
                                           .build();

        memberEmotionRepository.save(memberEmotion);
    }

    public List<MemberEmotionDayDto> getDayEmotion(Long memberId, String date) {
        List<MemberEmotion> memberEmotions = memberEmotionRepository.findByMemberIdAndDate(memberId, date);

        return memberEmotions.stream()
                .map(MemberEmotionDayDto::of)
                .collect(Collectors.toList());
    }

    public List<MemberEmotionPeriodDto> getEmotionsBetweenDates(Long memberId, String startDate, String endDate) {
        // 1. memberId와 date 범위를 기준으로 필터링
        MatchOperation matchOperation = Aggregation.match(
                Criteria.where("memberId").is(memberId)
                        .andOperator(
                                Criteria.where("date").gte(startDate),
                                Criteria.where("date").lte(endDate)
                        )
        );

        // 2. 각 날짜 및 감정별로 그룹화
        GroupOperation firstGroupOperation = Aggregation.group("date", "emotionId").count().as("count");

        // 3. 각 날짜별로 재그룹화하며 감정 정보 포함
        GroupOperation secondGroupOperation = Aggregation.group("_id.date")
                .push(new BasicDBObject("emotionId", "$_id.emotionId").append("count", "$count")).as("emotions");

        // 4. 날짜 필드를 직접 설정 (ProjectionOperation 추가)
        ProjectionOperation projectionOperation = Aggregation.project()
                .andExpression("_id").as("date")
                .and("emotions").as("emotions");

        // 5. 날짜별로 정렬
        SortOperation sortOperation = Aggregation.sort(Sort.by(Sort.Order.asc("date")));

        Aggregation aggregation = Aggregation.newAggregation(
                matchOperation,
                firstGroupOperation,
                secondGroupOperation,
                projectionOperation,
                sortOperation
        );

        // 5. 집계 연산 수행
        AggregationResults<MemberEmotionPeriodDto> results = mongoTemplate.aggregate(
                aggregation, "member_emotion", MemberEmotionPeriodDto.class
        );

        return results.getMappedResults();
    }
}
