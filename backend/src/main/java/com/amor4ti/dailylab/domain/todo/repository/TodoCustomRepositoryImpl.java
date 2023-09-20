package com.amor4ti.dailylab.domain.todo.repository;

import com.amor4ti.dailylab.domain.entity.QTodo;
import com.amor4ti.dailylab.domain.entity.Todo;
import com.amor4ti.dailylab.domain.todo.dto.response.QTodoDto;
import com.amor4ti.dailylab.domain.todo.dto.response.TodoDto;
import com.querydsl.jpa.impl.JPAQueryFactory;

import javax.persistence.EntityManager;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public class TodoCustomRepositoryImpl implements TodoCustomRepository {

    QTodo qtodo = QTodo.todo;

    private final JPAQueryFactory jpaQueryFactory;

    public TodoCustomRepositoryImpl(EntityManager em) {
        this.jpaQueryFactory = new JPAQueryFactory(em);
    }

    @Override
    public List<Todo> findTodayTodoListByMemberIdAndTodoDate(Long memberId, LocalDate todoDate) {

        return jpaQueryFactory
                .selectFrom(qtodo)
                .where(qtodo.member.memberId.eq(memberId)
                        .and(qtodo.todoDate.eq(todoDate)))
                .fetch();
    }

    @Override
    public Optional<Todo> findByMemberIdAndCategoryIdAndTodoDate(Long memberId, Long categoryId, LocalDate todoDate) {

        return Optional.ofNullable(jpaQueryFactory
                .selectFrom(qtodo)
                .where(qtodo.member.memberId.eq(memberId)
                        .and(qtodo.categoryId.eq(categoryId))
                        .and(qtodo.todoDate.eq(todoDate)))
                .fetchOne());
    }

    @Override
    public List<TodoDto> findByMemberId(Long memberId) {

        return jpaQueryFactory
                .select(new QTodoDto(
                                    qtodo.content,
                                    qtodo.categoryId,
                                    qtodo.todoDate,
                                    qtodo.checkedDate,
                                    qtodo.isSystem,
                                    qtodo.isDeleted,
                                    qtodo.member.memberId,
                                    qtodo.member.username
                                ))
                .from(qtodo)
                .where(qtodo.member.memberId.eq(memberId))
                .fetch();
    }
}
