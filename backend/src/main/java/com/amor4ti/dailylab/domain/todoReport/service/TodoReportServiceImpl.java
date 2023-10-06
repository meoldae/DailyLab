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
        log.info("하루 마무리 로직 시작 : 통계 시작");
        
        List<Todo> todayTodoList = todoRepository.findTodayTodoListByMemberIdAndTodoDate(memberId, todoDate);
        
        Member member = memberRepository.findMemberByMemberId(memberId)
                .orElseThrow(() -> new CustomException(ExceptionStatus.MEMBER_NOT_FOUND));

        log.info("오늘 todoList의 갯수 : " + todayTodoList.size());

        for (Todo todo : todayTodoList) {
            // 삭제한 todo였다면 todoReport에 저장하지 않음
            if(todo.isDeleted())
                continue;

            Optional<TodoReport> todoReport = todoReportRepository.findTodoReportByMemberIdAndCategoryId(memberId, todo.getCategory().getCategoryId());

            if(todoReport.isEmpty()) {
                log.info("기존에 존재하지 않은 todoReport");

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

                // 업데이트 적용 : 매 for문마다 save하는 것이 에러 추적 / 디버깅에 유리
                todoReportRepository.save(newTodoReport);
            }

            // 이미 db에 존재하는 todoReport인 경우
            else {
                log.info("기존에 존재했던 todoReport");
                // 이행 X Count 업데이트
                if(todo.getCheckedDate() == null)
                    todoReport.get().updateFailCount();

                // 이행 Count 업데이트
                else
                    todoReport.get().updateSuccessCount();

                // 최근 추천 일 업데이트
                todoReport.get().updateLastRecommendDate(todoDate);

                // 업데이트 적용 : 매 for문마다 save하는 것이 에러 추적 / 디버깅에 유리
                todoReportRepository.save(todoReport.get());
            }
        }

        log.info("오늘 하루 로직 마무리 : 통계 저장");
        
        return responseService.successResponse(ResponseStatus.RESPONSE_SUCCESS);
    }
}
