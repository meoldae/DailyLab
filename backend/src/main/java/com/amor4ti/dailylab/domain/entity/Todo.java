package com.amor4ti.dailylab.domain.entity;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Todo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long todoId;

    private String content;
    private Long categoryId;
    private LocalDate todoDate;
    private LocalDateTime checkedDate;
    private boolean isSystem;
    private boolean isDeleted;

    @ManyToOne
    @JoinColumn(name = "memberId")
    private Member member;

    @Builder
    public Todo(Long todoId, String content, Long categoryId, LocalDate todoDate, LocalDateTime checkedDate, boolean isSystem, boolean isDeleted, Member member) {
        this.todoId = todoId;
        this.content = content;
        this.categoryId = categoryId;
        this.todoDate = todoDate;
        this.checkedDate = checkedDate;
        this.isSystem = isSystem;
        this.isDeleted = isDeleted;
        this.member = member;
    }
}
