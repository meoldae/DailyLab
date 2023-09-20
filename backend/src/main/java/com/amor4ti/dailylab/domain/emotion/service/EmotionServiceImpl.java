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
import org.bson.Document;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.*;
import org.springframework.data.mongodb.core.query.Criteria;
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
        Criteria memberCriteria = Criteria.where("memberId").is(memberId).and("date").is(date);
        MatchOperation matchStage = Aggregation.match(memberCriteria);

        LookupOperation lookupStage = Aggregation.lookup("emotion", "emotionId", "emotionId", "emotionInfo");

        Aggregation aggregation = Aggregation.newAggregation(matchStage, lookupStage);

        List<Document> results = mongoTemplate.aggregate(aggregation, "member_emotion", Document.class).getMappedResults();

        return results.stream()
                .map(document -> {
                    List<Document> emotionInfoList = (List<Document>) document.get("emotionInfo");
                    Document emotionInfo = emotionInfoList.get(0);
                    String type = emotionInfo.getString("type");

                    return MemberEmotionDayDto.builder()
                            .emotionId(document.getInteger("emotionId"))
                            .type(type)
                            .date(document.getString("date"))
                            .timeStamp(document.getString("timestamp"))
                            .build();
                })
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

        // 2. emotion 컬렉션과 조인
        LookupOperation lookupOperation =
                Aggregation.lookup("emotion", "emotionId", "emotionId", "emotionInfo");

        // 3. 조인된 결과와 함께 각 날짜 및 감정별로 그룹화
        GroupOperation firstGroupOperation = Aggregation.group("date", "emotionId")
                                                        .first("emotionInfo.type")
                                                        .as("type")
                                                        .count().as("count");

        // 4. 각 날짜별로 재그룹화하며 감정 정보 포함
        GroupOperation secondGroupOperation = Aggregation.group("_id.date")
                                                         .push(new BasicDBObject("emotionId", "$_id.emotionId")
                                                         .append("count", "$count")
                                                         .append("type", "$type"))
                                                         .as("emotions");

        // 5. 날짜 필드를 직접 설정
        ProjectionOperation projectionOperation = Aggregation.project()
                                                             .andExpression("_id").as("date")
                                                             .and("emotions").as("emotions");

        // 6. 날짜별로 정렬
        SortOperation sortOperation = Aggregation.sort(Sort.by(Sort.Order.asc("date")));

        Aggregation aggregation = Aggregation.newAggregation(
                matchOperation,
                lookupOperation,
                firstGroupOperation,
                secondGroupOperation,
                projectionOperation,
                sortOperation
        );

        // 7. 집계 연산 수행
        AggregationResults<MemberEmotionPeriodDto> results = mongoTemplate.aggregate(
                aggregation, "member_emotion", MemberEmotionPeriodDto.class
        );

        return results.getMappedResults();
    }
}
