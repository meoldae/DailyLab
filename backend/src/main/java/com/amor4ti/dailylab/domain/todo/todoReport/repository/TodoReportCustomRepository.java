package com.amor4ti.dailylab.domain.todo.todoReport.repository;

import com.amor4ti.dailylab.domain.entity.TodoReport;

import java.util.Optional;

public interface TodoReportCustomRepository {

    Optional<TodoReport> getTodoReportByMemberIdAndCategoryId(Long memberId, Long categoryId);
}
