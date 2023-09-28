package com.amor4ti.dailylab.domain.diary.service;

import com.amor4ti.dailylab.domain.diary.dto.reqeust.DiaryTodos;
import com.amor4ti.dailylab.domain.diary.dto.reqeust.RequestDiaryDto;
import com.amor4ti.dailylab.domain.diary.dto.response.ResponseDiaryDto;
import com.amor4ti.dailylab.domain.diary.entity.DiaryHistory;
import com.amor4ti.dailylab.domain.diary.entity.DiaryPredict;
import com.amor4ti.dailylab.domain.diary.repository.DiaryHistoryRepository;
import com.amor4ti.dailylab.domain.diary.repository.DiaryPredictRepository;
import com.amor4ti.dailylab.domain.emotion.dto.response.MemberEmotionDayDto;
import com.amor4ti.dailylab.domain.emotion.mongorepo.EmotionRepository;
import com.amor4ti.dailylab.domain.emotion.service.EmotionService;
import com.amor4ti.dailylab.domain.entity.Member;
import com.amor4ti.dailylab.domain.member.repository.MemberRepository;
import com.amor4ti.dailylab.domain.member.service.MemberService;
import com.amor4ti.dailylab.domain.taste.service.TasteService;
import com.amor4ti.dailylab.domain.todo.repository.TodoRepository;
import com.amor4ti.dailylab.global.exception.CustomException;
import com.amor4ti.dailylab.global.exception.ExceptionStatus;
import com.amor4ti.dailylab.global.util.WebClientUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.retry.annotation.Backoff;
import org.springframework.retry.annotation.Retryable;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class DiaryServiceImpl implements DiaryService {

    @Value("${data-server-url}")
    private String DATA_SERVER_URL;

    private final MemberService memberService;

    private final WebClientUtil webClientUtil;
    private final EmotionService emotionService;

    private final TodoRepository todoRepository;
    private final EmotionRepository emotionRepository;
    private final DiaryPredictRepository diaryPredictRepository;
    private final DiaryHistoryRepository diaryHistoryRepository;
    private final MemberRepository memberRepository;
    private final TasteService tasteService;

    @Override
    @Retryable(
            maxAttempts = 3,
            backoff = @Backoff(delay = 100L)
    )
    @Transactional
    public void createConfirmDiary(Long memberId, LocalDate date) {
        Member member = memberRepository.findMemberByMemberId(memberId).orElseThrow();

        Optional<DiaryHistory> memberDiary = diaryHistoryRepository.findByMemberIdAndDiaryDate(memberId, date);
        if (memberDiary.isPresent()) {
            throw new CustomException(ExceptionStatus.TODAY_DIARY_IS_EXIST);
        }

        List<MemberEmotionDayDto> dayEmotion = emotionService.getDayEmotion(memberId, String.valueOf(date));
        Map<String, String> mostEmotionOnDay = aggregateEmotionsOnDay(dayEmotion);
        
        List<DiaryTodos> tasks = todoRepository.findTodayTodoListByMemberIdAndTodoDate(memberId, date)
                                                .stream()
                                                .map(todo -> DiaryTodos.builder()
                                                        .task(todo.getCategory().getSmall())
                                                        .content(todo.getContent())
                                                        .date(todo.getCheckedDate())
                                                        .build())
                                                .collect(Collectors.toList());

        webClientUtil.post(DATA_SERVER_URL + "/diary/default",
                           RequestDiaryDto.of(member, tasks, mostEmotionOnDay), Map.class)
                     .subscribe(
                            response -> {
                                diaryHistoryRepository.save(DiaryHistory.builder()
                                        .diaryDate(date)
                                        .memberId(memberId)
                                        .title(String.valueOf(response.get("title")))
                                        .content(String.valueOf(response.get("content")))
                                        .conclusion(String.valueOf(response.get("conclusion")))
                                        .advice(String.valueOf(response.get("advice")))
                                        .score(String.valueOf(response.get("score")))
                                        .build());

                                memberService.updateStatusComplete(memberId, date);
                                tasteService.updateTasteSummary(memberId);
                            },
                            error -> {
                                new CustomException(ExceptionStatus.DIARY_CANNOT_WRITE);
                            }
                    );
    }

    @Override
    @Retryable(
        maxAttempts = 3,
        backoff = @Backoff(delay = 100L)
    )
    @Transactional
    public void createDefaultDiary(Long memberId, LocalDate date) {
        Member member = memberRepository.findMemberByMemberId(memberId).orElseThrow();

        Optional<DiaryPredict> memberDiary = diaryPredictRepository.findByMemberIdAndDiaryDate(memberId, date);
        if (memberDiary.isPresent()) {
            throw new CustomException(ExceptionStatus.TODAY_DIARY_IS_EXIST);
        }

        List<MemberEmotionDayDto> dayEmotion = emotionService.getDayEmotion(memberId, String.valueOf(date));

        Map<String, String> mostEmotionOnDay = aggregateEmotionsOnDay(dayEmotion);

        List<DiaryTodos> tasks = todoRepository.findTodayTodoListByMemberIdAndTodoDate(memberId, date)
                .stream()
                .map(todo -> DiaryTodos.builder()
                                        .task(todo.getCategory().getSmall())
                                        .content(todo.getContent())
                                        .date(todo.getCheckedDate())
                                        .build())
                .collect(Collectors.toList());

        webClientUtil.post(DATA_SERVER_URL + "/diary/default", RequestDiaryDto.of(member, tasks, mostEmotionOnDay), Map.class)
                .subscribe(
                        response -> {
                            diaryPredictRepository.save(DiaryPredict.builder()
                                                                    .diaryDate(date)
                                                                    .memberId(memberId)
                                                                    .title(String.valueOf(response.get("title")))
                                                                    .content(String.valueOf(response.get("content")))
                                                                    .build());
                        },
                        error -> {
                            new CustomException(ExceptionStatus.DIARY_CANNOT_WRITE);
                        }
                );
    }

    public ResponseDiaryDto getDiaryOnToday(Long memberId, LocalDate date) {
        DiaryPredict diaryPredict = diaryPredictRepository.findByMemberIdAndDiaryDate(memberId, date)
                                                          .orElseThrow(() -> new CustomException(ExceptionStatus.DIARY_DAY_NOT_EXIST));

        return ResponseDiaryDto.ofToday(diaryPredict);
    }

    @Override
    public ResponseDiaryDto getDiaryOnDate(Long memberId, LocalDate date) {
        DiaryHistory diaryHistory = diaryHistoryRepository.findByMemberIdAndDiaryDate(memberId, date)
                                                          .orElseThrow(() -> new CustomException(ExceptionStatus.DIARY_DAY_NOT_EXIST));

        return ResponseDiaryDto.ofDate(diaryHistory);
    }

    private Map<String, String> aggregateEmotionsOnDay(List<MemberEmotionDayDto> dayEmotion) {

        Map<String, Map<Integer, Integer>> hourlyEmotions = new HashMap<>();

        for (MemberEmotionDayDto emotion : dayEmotion) {
            int hour = Integer.parseInt(emotion.getTimeStamp().split(":")[0]);

            String timeSlot = hour + ":00 - " + (hour + 1) + ":00";

            Map<Integer, Integer> emotionCount = hourlyEmotions
                                                .computeIfAbsent(timeSlot, k -> new HashMap<>());

            // 횟수 집계
            emotionCount.merge(emotion.getEmotionId(), 1, Integer::sum);
        }

        Map<String, String> mostEmotionInHour = new HashMap<>();
        for (Map.Entry<String, Map<Integer, Integer>> entry : hourlyEmotions.entrySet()) {
            String timeSlot = entry.getKey();
            Map<Integer, Integer> emotionCount = entry.getValue();

            int mostEmotionId = Collections.max(emotionCount.entrySet(), Map.Entry.comparingByValue()).getKey();

            // 23.09.27 마음에 안드는 로직...
            String emotionName = emotionRepository.findByEmotionId(mostEmotionId).getName();
            mostEmotionInHour.put(timeSlot, emotionName);
        }
        return mostEmotionInHour;
    }
}

