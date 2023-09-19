package com.amor4ti.dailylab.domain.todo.todoReport.repository;

import com.amor4ti.dailylab.domain.entity.QTodoReport;
import com.amor4ti.dailylab.domain.entity.TodoReport;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;

import javax.persistence.EntityManager;
import java.util.Optional;

public class TodoReportCustomRepositoryImpl implements TodoReportCustomRepository {

    private final JPAQueryFactory jpaQueryFactory;

    public TodoReportCustomRepositoryImpl(EntityManager em) {
        this.jpaQueryFactory = new JPAQueryFactory(em);
    }
    @Override
    public Optional<TodoReport> getTodoReportByMemberIdAndCategoryId(Long memberId, Long categoryId) {
        QTodoReport qTodoReport = QTodoReport.todoReport;

        return Optional.ofNullable(jpaQueryFactory
                .selectFrom(qTodoReport)
                .where(qTodoReport.member.memberId.eq(memberId)
                        .and(qTodoReport.categoryId.eq(categoryId)))
                .fetchOne());
    }
}
