package com.amor4ti.dailylab.domain.todo.repository;

import com.amor4ti.dailylab.domain.entity.Todo;
import com.amor4ti.dailylab.domain.todo.dto.response.*;
import com.querydsl.core.types.Expression;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.core.types.dsl.CaseBuilder;
import com.querydsl.jpa.impl.JPAQueryFactory;

import javax.persistence.EntityManager;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import static com.amor4ti.dailylab.domain.entity.QTodo.todo;
import static com.amor4ti.dailylab.domain.entity.category.QCategoryBlackList.categoryBlackList;

public class TodoCustomRepositoryImpl implements TodoCustomRepository {

    private final JPAQueryFactory jpaQueryFactory;

    public TodoCustomRepositoryImpl(EntityManager em) {
        this.jpaQueryFactory = new JPAQueryFactory(em);
    }

    private List<Long> fetchBlackListCategoryIdList(Long memberId) {
        return jpaQueryFactory
                .select(categoryBlackList.id.categoryId)
                .from(categoryBlackList)

                // isRemove가 false이면서 블랙리스트 주인이 맞는경우 blacklist의 categoryId에 한해서
                .where(categoryBlackListIsRemoveEquals(false)
                        .and(categoryBlackListMemberIdEquals(memberId)))
                .fetch();
    }

    @Override
    public List<Todo> findTodayTodoListByMemberIdAndTodoDate(Long memberId, LocalDate todoDate) {
        List<Long> blackListCategoryIdList = fetchBlackListCategoryIdList(memberId);

        return jpaQueryFactory
                .selectFrom(todo)
                .where(memberIdEquals(memberId)
                        .and(todoDateEquals(todoDate))
                        .and(isDeletedEquals(false))
                        .and(notInBlackListCategory(blackListCategoryIdList)))
                .fetch();
    }

    @Override
    public List<TodoSmallDto> findSomedayPartTodoDtoListByMemberIdAndTodoDate(LocalDate todoDate, Long memberId) {
        List<Long> blackListCategoryIdList = fetchBlackListCategoryIdList(memberId);

        return jpaQueryFactory
                .select(new QTodoSmallDto(
                        todo.todoId,
                        todo.content,
                        checkedExpression
                ))
                .from(todo)
                .where(memberIdEquals(memberId)
                        .and(todoDateEquals(todoDate))
                        .and(isDeletedEquals(false))
                        .and(notInBlackListCategory(blackListCategoryIdList)))
                .fetch();
    }

    @Override
    public List<TodoDto> findSomedayFullTodoDtoListByMemberIdAndTodoDate(LocalDate todoDate, Long memberId) {
        List<Long> blackListCategoryIdList = fetchBlackListCategoryIdList(memberId);

        return jpaQueryFactory
                .select(new QTodoDto(
                        todo.todoId,
                        todo.content,
                        todo.category.categoryId,
                        todo.category.large,
                        todo.category.medium,
                        todo.category.small,
                        todo.todoDate,
                        todo.checkedDate,
                        checkedExpression,
                        todo.isSystem,
                        todo.isDeleted,
                        todo.member.memberId,
                        todo.member.username))
                .from(todo)
                .where(memberIdEquals(memberId)
                        .and(todoDateEquals(todoDate))
                        .and(isDeletedEquals(false))
                        .and(notInBlackListCategory(blackListCategoryIdList)))
                .fetch();
    }

    @Override
    public Optional<Todo> findByMemberIdAndCategoryId(Long memberId, Long categoryId) {
        List<Long> blackListCategoryIdList = fetchBlackListCategoryIdList(memberId);

        return Optional.ofNullable(jpaQueryFactory
                .selectFrom(todo)
                .where(memberIdEquals(memberId)
                        .and(categoryIdEquals(categoryId))
                        .and(isDeletedEquals(false))
                        .and(notInBlackListCategory(blackListCategoryIdList)))
                .fetchOne());
    }

    @Override
    public Optional<Todo> findByMemberIdAndCategoryIdAndTodoDate(Long memberId, Long categoryId, LocalDate todoDate) {
        List<Long> blackListCategoryIdList = fetchBlackListCategoryIdList(memberId);

        return Optional.ofNullable(jpaQueryFactory
                .selectFrom(todo)
                .where(todo.member.memberId.eq(memberId)
                        .and(categoryIdEquals(categoryId))
                        .and(todoDateEquals(todoDate))
                        .and(isDeletedEquals(false))
                        .and(notInBlackListCategory(blackListCategoryIdList)))
                .fetchOne());
    }

    @Override
    public List<TodoDto> findByMemberId(Long memberId) {
        List<Long> blackListCategoryIdList = fetchBlackListCategoryIdList(memberId);

        return jpaQueryFactory
                .select(new QTodoDto(
                        todo.todoId,
                        todo.content,
                        todo.category.categoryId,
                        todo.category.large,
                        todo.category.medium,
                        todo.category.small,
                        todo.todoDate,
                        todo.checkedDate,
                        checkedExpression,
                        todo.isSystem,
                        todo.isDeleted,
                        todo.member.memberId,
                        todo.member.username
                                ))
                .from(todo)
                .where(memberIdEquals(memberId)
                        .and(isDeletedEquals(false))
                        .and(notInBlackListCategory(blackListCategoryIdList)))
                .fetch();
    }

    @Override
    public Optional<TodoRecommendedDto> findTodoRecommendedDtoByMemberIdAndTodoId(Long memberId, Long todoId) {
        List<Long> blackListCategoryIdList = fetchBlackListCategoryIdList(memberId);

        TodoRecommendedDto result = jpaQueryFactory
                .select(new QTodoRecommendedDto(
                        todo.category.categoryId,
                        todo.category.large,
                        todo.category.medium,
                        todo.category.small,
                        checkedExpression

                ))
                .from(todo)
                .where(todoIdEquals(todoId)
                        .and(isDeletedEquals(false))
                        .and(notInBlackListCategory(blackListCategoryIdList)))
                .fetchOne();

        return Optional.ofNullable(result);
    }

    @Override
    public long countMemberTodoByMemberIdAndTodoDate(Long memberId, LocalDate todoDate) {

        return jpaQueryFactory
                .select(todo.count())
                .from(todo)
                .where(memberIdEquals(memberId)
                        .and(todoDateEquals(todoDate))
                        .and(isDeletedEquals(false))
                        .and(isSystemEquals(false)))
                .fetchCount();
    }

    // checkedDate가 null이면 false, 아니면 true
    Expression<Boolean> checkedExpression = new CaseBuilder()
            .when(todo.checkedDate.isNull()).then(false)
            .otherwise(true);

    /*
    * where문 공통 코드
    * */
    private BooleanExpression notInBlackListCategory(List<Long> blackListCategoryIdList) {

        return todo.category.categoryId.notIn(blackListCategoryIdList);
    }

    private BooleanExpression todoDateEquals(LocalDate todoDate) {

        return todo.todoDate.eq(todoDate);
    }

    private BooleanExpression memberIdEquals(Long memberId) {

        return todo.member.memberId.eq(memberId);
    }

    private BooleanExpression todoIdEquals(Long todoId) {

        return todo.todoId.eq(todoId);
    }

    private BooleanExpression isSystemEquals(Boolean isSystem) {

        return todo.isSystem.eq(isSystem);
    }

    private BooleanExpression categoryIdEquals(Long categoryId) {
        return todo.category.categoryId.eq(categoryId);
    }

    private BooleanExpression categoryBlackListIsRemoveEquals(Boolean isRemove) {
        return categoryBlackList.isRemove.eq(isRemove);
    }

    private BooleanExpression categoryBlackListMemberIdEquals(Long memberId) {
        return categoryBlackList.id.memberId.eq(memberId);
    }

    private BooleanExpression isDeletedEquals(boolean isDelete) {
        return todo.isDeleted.eq(isDelete);
    }
}
