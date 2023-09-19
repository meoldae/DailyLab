package com.amor4ti.dailylab.domain.todo.repository;

import com.amor4ti.dailylab.domain.entity.QTodo;
import com.amor4ti.dailylab.domain.entity.Todo;
import com.querydsl.jpa.impl.JPAQueryFactory;

import javax.persistence.EntityManager;
import java.time.LocalDate;
import java.util.Optional;

public class TodoCustomRepositoryImpl implements TodoCustomRepository {

    private final JPAQueryFactory jpaQueryFactory;

    public TodoCustomRepositoryImpl(EntityManager em) {
        this.jpaQueryFactory = new JPAQueryFactory(em);
    }

    @Override
    public Optional<Todo> findByMemberIdAndCategoryIdAndTodoDate(Long memberId, Long categoryId, LocalDate todoDate) {
        QTodo qtodo = QTodo.todo;

        return Optional.ofNullable(jpaQueryFactory
                .selectFrom(qtodo)
                .where(qtodo.member.memberId.eq(memberId)
                        .and(qtodo.categoryId.eq(categoryId))
                        .and(qtodo.todoDate.eq(todoDate)))
                .fetchOne());
    }
}
