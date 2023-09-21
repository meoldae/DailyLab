package com.amor4ti.dailylab.domain.diary.service;

import com.amor4ti.dailylab.domain.diary.dto.reqeust.DiaryTodos;
import com.amor4ti.dailylab.domain.diary.dto.reqeust.RequestDiaryDto;
import com.amor4ti.dailylab.domain.diary.entity.DiaryPredict;
import com.amor4ti.dailylab.domain.diary.repository.DiaryPredictRepository;
import com.amor4ti.dailylab.domain.entity.Member;
import com.amor4ti.dailylab.domain.entity.Todo;
import com.amor4ti.dailylab.domain.member.repository.MemberRepository;
import com.amor4ti.dailylab.domain.todo.repository.TodoRepository;
import com.amor4ti.dailylab.domain.todoReport.repository.TodoReportRepository;
import com.amor4ti.dailylab.global.exception.CustomException;
import com.amor4ti.dailylab.global.exception.ExceptionStatus;
import com.amor4ti.dailylab.global.util.WebClientUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class DiaryServiceImpl implements DiaryService {

    @Value("${data-server-url}")
    private String DATA_SERVER_URL;

    private final WebClientUtil webClientUtil;
    private final DiaryPredictRepository diaryPredictRepository;
    private final MemberRepository memberRepository;
    private final TodoRepository todoRepository;

    @Transactional
    public void createDefaultDiary(Long memberId, LocalDate date) {
        Member member = memberRepository.findMemberByMemberId(memberId).orElseThrow();

        Optional<DiaryPredict> memberDiary = diaryPredictRepository.findByMemberIdAntDate(memberId, date);
        if (memberDiary.isPresent()) {
            throw new CustomException(ExceptionStatus.TODAY_DIARY_IS_EXIST);
        }

        List<DiaryTodos> tasks = todoRepository.findTodayTodoListByMemberIdAndTodoDate(memberId, date)
                .stream()
                .map(todo -> DiaryTodos.builder()
                                        .task(todo.getCategory().getSmall())
                                        .content(todo.getContent())
                                        .date(todo.getCheckedDate())
                                        .build())
                .collect(Collectors.toList());

        webClientUtil.post(DATA_SERVER_URL + "/diary/default", RequestDiaryDto.of(member, tasks), String.class)
                .subscribe(
                        response -> {
                            diaryPredictRepository.save(DiaryPredict.builder()
                                                                    .diaryDate(date)
                                                                    .memberId(memberId)
                                                                    .content(response).build());
                        },
                        error -> {
                            new CustomException(ExceptionStatus.DIARY_CANNOT_WRITE);
                        }
                );
    }
}

