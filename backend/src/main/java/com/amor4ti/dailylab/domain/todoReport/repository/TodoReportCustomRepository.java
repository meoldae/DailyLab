package com.amor4ti.dailylab.domain.todoReport.repository;

import com.amor4ti.dailylab.domain.entity.TodoReport;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface TodoReportCustomRepository {

    Optional<TodoReport> findTodoReportByMemberIdAndCategoryId(Long memberId, Long categoryId);
}
