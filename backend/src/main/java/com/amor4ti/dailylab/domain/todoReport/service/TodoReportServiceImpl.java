package com.amor4ti.dailylab.domain.todoReport.service;

import com.amor4ti.dailylab.domain.entity.Member;
import com.amor4ti.dailylab.domain.entity.Todo;
import com.amor4ti.dailylab.domain.entity.TodoReport;
import com.amor4ti.dailylab.domain.member.repository.MemberRepository;
import com.amor4ti.dailylab.domain.todo.repository.TodoRepository;
import com.amor4ti.dailylab.domain.todoReport.repository.TodoReportRepository;
import com.amor4ti.dailylab.global.exception.CustomException;
import com.amor4ti.dailylab.global.exception.ExceptionStatus;
import com.amor4ti.dailylab.global.response.CommonResponse;
import com.amor4ti.dailylab.global.response.ResponseService;
import com.amor4ti.dailylab.global.response.ResponseStatus;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class TodoReportServiceImpl implements TodoReportService {

    private final ResponseService responseService;
    private final TodoReportRepository todoReportRepository;
    private final TodoRepository todoRepository;
    private final MemberRepository memberRepository;

    @Override
    @Transactional
    public CommonResponse finishToday(Long memberId, LocalDate todoDate) {
        List<Todo> todayTodoList = todoRepository.findTodayTodoListByMemberIdAndTodoDate(memberId, todoDate);
        List<TodoReport> todoReportList = todoReportRepository.findAll();
        Member member = memberRepository.findMemberByMemberId(memberId)
                .orElseThrow(() -> new CustomException(ExceptionStatus.MEMBER_NOT_FOUND));

        for (Todo todo : todayTodoList) {
            Optional<TodoReport> todoReport = todoReportRepository.findTodoReportByMemberIdAndCategoryId(memberId, todo.getCategory().getCategoryId());

            // 기존에 db에 존재하지 않는 todoReport인 경우
            if(todoReport.isEmpty()) {
                TodoReport newTodoReport = TodoReport.builder()
                        .member(member)
                        .categoryId(todo.getCategory().getCategoryId())
                        .successCount(0L)
                        .failCount(0L)
                        .firstRecommendDate(todoDate)
                        .lastRecommendDate(todoDate)
                        .build();

                // 이행 X Count 업데이트
                if(todo.getCheckedDate() == null)
                    newTodoReport.updateFailCount();

                // 이행 Count 업데이트
                else
                    newTodoReport.updateSuccessCount();

                // 업데이트 적용
                todoReportRepository.save(newTodoReport);
            }

            // 이미 db에 존재하는 todoReport인 경우
            else {
                // 이행 X Count 업데이트
                if(todo.getCheckedDate() == null)
                    todoReport.get().updateFailCount();

                // 이행 Count 업데이트
                else
                    todoReport.get().updateSuccessCount();

                // 최근 추천 일 업데이트
                todoReport.get().updateLastRecommendDate(todoDate);

                // 업데이트 적용
                todoReportRepository.save(todoReport.get());
            }
        }

        return responseService.successResponse(ResponseStatus.RESPONSE_SUCCESS);
    }
}
