package com.amor4ti.dailylab.domain.todoReport.repository;

import com.amor4ti.dailylab.domain.entity.QTodoReport;
import com.amor4ti.dailylab.domain.entity.TodoReport;
import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.data.repository.query.Param;

import javax.persistence.EntityManager;
import java.util.Optional;

public class TodoReportCustomRepositoryImpl implements TodoReportCustomRepository {

    private final JPAQueryFactory jpaQueryFactory;

    public TodoReportCustomRepositoryImpl(EntityManager em) {
        this.jpaQueryFactory = new JPAQueryFactory(em);
    }

    @Override
    public Optional<TodoReport> findTodoReportByMemberIdAndCategoryId(Long memberId, Long categoryId) {
        QTodoReport qTodoReport = QTodoReport.todoReport;

        return Optional.ofNullable(jpaQueryFactory
                .selectFrom(qTodoReport)
                .where(qTodoReport.member.memberId.eq(memberId)
                        .and(qTodoReport.categoryId.eq(categoryId)))
                .fetchOne());
    }
}
