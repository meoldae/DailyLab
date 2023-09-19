package com.amor4ti.dailylab.domain.todoReport.repository;

import com.amor4ti.dailylab.domain.entity.Todo;
import com.amor4ti.dailylab.domain.entity.TodoReport;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface TodoReportRepository extends JpaRepository<TodoReport, Long>,
                                              TodoReportCustomRepository,
                                              QuerydslPredicateExecutor<Todo> {
}
