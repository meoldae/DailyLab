package com.amor4ti.dailylab.domain.todo.repository;

import com.amor4ti.dailylab.domain.entity.TodoReport;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TodoReportRepository extends JpaRepository<TodoReport, Long> {

    Optional<TodoReport> findByUserInfoIdAndCategoryId(Long userInfoId, Long categoryId);
}
