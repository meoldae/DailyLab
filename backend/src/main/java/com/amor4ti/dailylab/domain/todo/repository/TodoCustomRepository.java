package com.amor4ti.dailylab.domain.todo.repository;

import com.amor4ti.dailylab.domain.entity.Todo;
import com.amor4ti.dailylab.domain.todo.dto.response.TodoDto;
import com.amor4ti.dailylab.domain.todo.dto.response.TodoRecommendedDto;
import com.amor4ti.dailylab.domain.todo.dto.response.TodoSmallDto;
import com.querydsl.core.Tuple;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface TodoCustomRepository {

    List<Todo> findTodayTodoListByMemberIdAndTodoDate(Long memberId, LocalDate todoDate);

    List<TodoSmallDto> findSomedayPartTodoDtoListByMemberIdAndTodoDate(LocalDate todoDate, Long memberId);

    List<TodoDto> findSomedayFullTodoDtoListByMemberIdAndTodoDate(LocalDate todoDate, Long memberId);

    Optional<Todo> findByMemberIdAndCategoryId(Long memberId, Long categoryId);

    List<Todo> findByMemberIdAndCategoryIdAndTodoDate(Long memberId, Long categoryId, LocalDate todoDate);

    List<TodoDto> findByMemberId(Long memberId);

    Optional<TodoRecommendedDto> findTodoRecommendedDtoByMemberIdAndTodoId(Long memberId, Long todoId);

    long countMemberTodoByMemberIdAndTodoDate(Long memberId, LocalDate todoDate);

    List<Tuple> getStatistics(LocalDate startDate, LocalDate endDate, List<Long> IdList);
}
