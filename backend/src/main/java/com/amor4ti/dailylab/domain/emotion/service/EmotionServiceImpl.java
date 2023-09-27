package com.amor4ti.dailylab.domain.emotion.service;


import com.amor4ti.dailylab.domain.emotion.dto.request.RegisterMemberEmotionDto;
import com.amor4ti.dailylab.domain.emotion.dto.response.*;
import com.amor4ti.dailylab.domain.emotion.entity.EmotionAggregate;
import com.amor4ti.dailylab.domain.emotion.entity.MemberEmotion;
import com.amor4ti.dailylab.domain.emotion.repository.EmotionAggregateRepository;
import com.amor4ti.dailylab.domain.emotion.mongorepo.EmotionRepository;
import com.amor4ti.dailylab.domain.emotion.entity.Emotion;
import com.amor4ti.dailylab.domain.emotion.mongorepo.MemberEmotionRepository;
import com.amor4ti.dailylab.domain.entity.Member;
import com.amor4ti.dailylab.domain.member.dto.EmotionMemberDto;
import com.amor4ti.dailylab.domain.member.repository.MemberRepository;
import com.amor4ti.dailylab.global.exception.CustomException;
import com.amor4ti.dailylab.global.exception.ExceptionStatus;
import com.mongodb.BasicDBObject;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.bson.Document;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.*;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.Period;
import java.util.*;
import java.util.function.Function;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class EmotionServiceImpl implements EmotionService {

    private final EmotionRepository emotionRepository;
    private final MemberEmotionRepository memberEmotionRepository;
    private final MemberRepository memberRepository;
    private final EmotionAggregateRepository emotionAggregateRepository;

    private final MongoTemplate mongoTemplate;

    @Override
    public List<Emotion> getAllEmotion() {
        return emotionRepository.findAll();
    }

    @Override
    public void registerEmotion(RegisterMemberEmotionDto requestDto) {
        String[] dates = requestDto.getTimeStamp().split(" ");

        String date = dates[0];
        String timestamp = dates[1];

        // 해당 memberId와 date에 해당하는 도큐먼트 조회
        Optional<MemberEmotion> memberEmotionDay = memberEmotionRepository.findByMemberIdAndDate(requestDto.getMemberId(), date);

        if (!memberEmotionDay.isPresent()) {
            // 도큐먼트가 없는 경우, 새로운 도큐먼트 생성
            MemberEmotion newEmotionDay = MemberEmotion.build(requestDto.getMemberId(), date, new ArrayList<>());

            newEmotionDay.getEmotions().add(new EmotionDetail(requestDto.getEmotionId(), timestamp));
            memberEmotionRepository.save(newEmotionDay);
        } else {
            // 도큐먼트가 이미 있는 경우, emotions 배열에 추가
            MemberEmotion memberEmotion = memberEmotionDay.get();
            memberEmotion.getEmotions().add(new EmotionDetail(requestDto.getEmotionId(), timestamp));
            memberEmotionRepository.save(memberEmotion);
        }
    }

    @Override
    public List<MemberEmotionDayDto> getDayEmotion(Long memberId, String date) {
        Criteria memberCriteria = Criteria.where("memberId").is(memberId).and("date").is(date);
        MatchOperation matchStage = Aggregation.match(memberCriteria);

        LookupOperation lookupStage = Aggregation.lookup("emotion", "emotions.emotionId", "emotionId", "emotionInfo");

        Aggregation aggregation = Aggregation.newAggregation(matchStage, lookupStage);

        List<Document> results = mongoTemplate.aggregate(aggregation, "member_emotion", Document.class).getMappedResults();

        return results.stream()
                .flatMap(document -> {
                    List<Document> emotions = (List<Document>) document.get("emotions");
                    List<Document> emotionInfoList = (List<Document>) document.get("emotionInfo");

                    return emotions.stream().map(emotion -> {
                        Integer emotionId = emotion.getInteger("emotionId");
                        Document matchedEmotionInfo = emotionInfoList.stream()
                                                                     .filter(e -> e.getInteger("emotionId").equals(emotionId))
                                                                     .findFirst()
                                                                     .orElse(null);

                        String type = matchedEmotionInfo != null ? matchedEmotionInfo.getString("type") : null;

                        return MemberEmotionDayDto.builder()
                                                  .emotionId(emotionId)
                                                  .type(type)
                                                  .timeStamp(emotion.getString("timestamp"))
                                                  .build();
                    });
                })
                .collect(Collectors.toList());
    }

    @Override
    public List<MemberEmotionPeriodDto> getEmotionsBetweenDates(Long memberId, String startDate, String endDate) {
        // 1. memberId와 date 범위를 기준으로 필터링
        MatchOperation matchOperation = Aggregation.match(
                Criteria.where("memberId").is(memberId)
                        .andOperator(
                                Criteria.where("date").gte(startDate),
                                Criteria.where("date").lte(endDate)
                        )
        );

        // 2. Unwind operation to flatten the emotions array
        UnwindOperation unwindOperation = Aggregation.unwind("emotions");

        // 3. emotion 컬렉션과 조인
        LookupOperation lookupOperation = LookupOperation.newLookup()
                                                         .from("emotion")
                                                         .localField("emotions.emotionId")
                                                         .foreignField("emotionId")
                                                         .as("emotionInfo");

        UnwindOperation unwindOperation2 = Aggregation.unwind("emotionInfo");

        // 4. 조인된 결과와 함께 각 날짜 및 감정별로 그룹화
        GroupOperation firstGroupOperation = Aggregation.group("date", "emotions.emotionId")
                                                        .first("emotionInfo.type")
                                                        .as("type")
                                                        .count().as("count");

        // 5. 각 날짜별로 재그룹화하며 감정 정보 포함
        GroupOperation secondGroupOperation = Aggregation.group("_id.date")
                                                         .push(new BasicDBObject("emotionId", "$_id.emotionId")
                                                                 .append("count", "$count")
                                                                 .append("type", "$type"))
                                                         .as("emotions");

        // 6. 날짜 필드를 직접 설정
        ProjectionOperation projectionOperation = Aggregation.project()
                                                             .andExpression("_id").as("date")
                                                             .and("emotions").as("emotions");

        // 7. 날짜별로 정렬
        SortOperation sortOperation = Aggregation.sort(Sort.by(Sort.Order.asc("date")));

        Aggregation aggregation = Aggregation.newAggregation(
                                                matchOperation,
                                                unwindOperation,
                                                lookupOperation,
                                                unwindOperation2,
                                                firstGroupOperation,
                                                secondGroupOperation,
                                                projectionOperation,
                                                sortOperation
        );

        // 8. 집계 연산 수행
        AggregationResults<MemberEmotionPeriodDto> results = mongoTemplate.aggregate(
                aggregation, "member_emotion", MemberEmotionPeriodDto.class
        );

        return results.getMappedResults();
    }

    @Override
    public List<ResponseEmotionAggregate> getEmotionsAggregate(Long memberId, LocalDate startDate, LocalDate endDate) {
        Member member = memberRepository.findMemberByMemberId(memberId).
                        orElseThrow(() -> new CustomException(ExceptionStatus.MEMBER_NOT_FOUND));

        int ageId = Period.between(member.getBirthday(), LocalDate.now()).getYears() / 10;
        String gender = member.getGender();

        List<EmotionAggregate> aggregates =
                emotionAggregateRepository.findByAgeIdAndGenderAndDateBetween(ageId, gender, startDate, endDate)
                                          .orElseThrow(() -> new CustomException(ExceptionStatus.NOT_FOUND_AGGREGATE));

        List<ResponseEmotionAggregate> result = new ArrayList<>();

        for (EmotionAggregate aggregate : aggregates) {
            ResponseEmotionAggregate emotions = ResponseEmotionAggregate.builder()
                                                                        .date(aggregate.getDate())
                                                                        .emotions(EmotionAggregateCount.of(aggregate))
                                                                        .build();
            result.add(emotions);
        }

        return result;
    }

    @Override
    public void updateEmotionsAggregate(String date) {
        // 1. 오늘의 Emotion Value 전부 가져오기
        Query query = new Query();
        query.addCriteria(Criteria.where("date").is(date));
        List<EmotionAggregateDto> memberEmotions = mongoTemplate.find(query, EmotionAggregateDto.class, "member_emotion");

        // 2. 단일 조회로 전체 회원 정보 가져오기
        List<Long> memberIds = memberEmotions.stream()
                                             .map(EmotionAggregateDto::getMemberId)
                                             .collect(Collectors.toList());

        List<Member> findMembers = memberRepository.findAllById(memberIds);

        List<EmotionMemberDto> membersInfo = findMembers.stream()
                                                        .map(EmotionMemberDto::of)
                                                        .collect(Collectors.toList());

        Map<String, Integer> aggregateData = aggregateData(memberEmotions, membersInfo);

        // 3. 집계된 데이터 DB에 PUSH
        saveAggregatedData(aggregateData, date);
    }


    /**
     * 회원을 순회 하면서 Emotion Count
     * @return 연령_성별_EmotionId, 개수로 반환
     */
    private Map<String, Integer> aggregateData(List<EmotionAggregateDto> memberEmotions,
                                                    List<EmotionMemberDto> membersInfo) {

        Map<String, Integer> aggregateData = new HashMap<>();

        Map<Long, EmotionMemberDto> membersInfoMap = membersInfo.stream()
                .collect(Collectors.toMap(EmotionMemberDto::getMemberId, Function.identity()));

        for (EmotionAggregateDto memberEmotion : memberEmotions) {
            Long memberId = memberEmotion.getMemberId();
            EmotionMemberDto memberInfo = membersInfoMap.get(memberId);

            int ageGroup = Period.between(memberInfo.getBirthday(), LocalDate.now()).getYears() / 10;

            for (EmotionDetail emotionDetail : memberEmotion.getEmotions()) {
                String key = ageGroup + "_" + memberInfo.getGender() + "_" + emotionDetail.getEmotionId();
                int emotionCount = aggregateData.getOrDefault(key, 0);

                emotionCount++;
                aggregateData.put(key, emotionCount);
            }
        }

        return aggregateData;
    }

    private void saveAggregatedData(Map<String, Integer> aggregateData, String date) {
        LocalDate localDate = LocalDate.parse(date);
        Map<String, EmotionAggregate> aggregateMap = new HashMap<>();


        for (Map.Entry<String, Integer> entry : aggregateData.entrySet()) {
            String[] keys = entry.getKey().split("_");
            int ageGroup = Integer.parseInt(keys[0]);
            String gender = keys[1];
            int emotionId = Integer.parseInt(keys[2]);
            long count = entry.getValue();

            String key = ageGroup + "_" + gender;
            EmotionAggregate aggregate = aggregateMap.computeIfAbsent(key, k ->
                    EmotionAggregate.builder()
                                    .ageId(ageGroup)
                                    .date(localDate)
                                    .gender(gender)
                                    .build()
            );

            switch (emotionId) {
                case 1: aggregate.setMovedCount(count); break;
                case 2: aggregate.setAngerCount(count); break;
                case 3: aggregate.setAbsurdCount(count); break;
                case 4: aggregate.setJoyCount(count); break;
                case 5: aggregate.setHappyCount(count); break;
                case 6: aggregate.setProudCount(count); break;
                case 7: aggregate.setExcitedCount(count); break;
                case 8: aggregate.setThankfulCount(count); break;
                case 9: aggregate.setComfortCount(count); break;
                case 10: aggregate.setStuffyCount(count); break;
                case 11: aggregate.setDepressionCount(count); break;
                case 12: aggregate.setSadCount(count); break;
                case 13: aggregate.setPanicCount(count); break;
                case 14: aggregate.setAnnoyCount(count); break;
                case 15: aggregate.setTiredCount(count); break;
                default: break;
            }

        }
        emotionAggregateRepository.saveAll(aggregateMap.values());
    }

}
