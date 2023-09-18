package com.amor4ti.dailylab.domain.todo.repository;

import com.amor4ti.dailylab.domain.entity.Todo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TodoRepository extends JpaRepository<Todo, Long> {

    List<Todo> findByMemberId(Long memberId);
}
