package com.amor4ti.dailylab.domain.todo.repository;

import com.amor4ti.dailylab.domain.entity.Todo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface TodoRepository extends JpaRepository<Todo, Long>,
                                        TodoCustomRepository,
                                        QuerydslPredicateExecutor<Todo> {

//    @Query("SELECT t FROM Todo t WHERE t.member.memberId = :memberId")
//    List<Todo> findByMemberId(Long memberId);

    @Query("SELECT t FROM Todo t WHERE t.todoId = :todoId")
    Optional<Todo> findByTodoId(@Param("todoId") Long todoId);
}
