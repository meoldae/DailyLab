package com.amor4ti.dailylab.domain.todo.repository;

import com.amor4ti.dailylab.domain.entity.Todo;

import java.time.LocalDate;
import java.util.Optional;

public interface TodoCustomRepository {

    Optional<Todo> findByMemberIdAndCategoryIdAndTodoDate(Long memberId, Long categoryId, LocalDate todo_date);
}
