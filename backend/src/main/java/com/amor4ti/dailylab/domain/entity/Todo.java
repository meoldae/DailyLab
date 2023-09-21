package com.amor4ti.dailylab.domain.entity;

import com.amor4ti.dailylab.domain.entity.category.Category;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Todo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long todoId;

    private String content;
    private LocalDate todoDate;
    private LocalDateTime checkedDate;
    private boolean isSystem;
    private boolean isDeleted;

    @ManyToOne
    @JoinColumn(name = "memberId")
    private Member member;

    @ManyToOne
    @JoinColumn(name = "categoryId")
    private Category category;

    @Builder
    public Todo(Long todoId, String content, Category category, LocalDate todoDate, LocalDateTime checkedDate, boolean isSystem, boolean isDeleted, Member member) {
        this.todoId = todoId;
        this.content = content;
        this.category = category;
        this.todoDate = todoDate;
        this.checkedDate = checkedDate;
        this.isSystem = isSystem;
        this.isDeleted = isDeleted;
        this.member = member;
    }

    public void deleteTodo() {
        this.isDeleted = true;
    }

    public void checkTodo(String checkedDate) {
        DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");

        if(this.checkedDate == null)
            this.checkedDate = LocalDateTime.parse(checkedDate, dateTimeFormatter);
        else
            this.checkedDate = null;
    }
}
