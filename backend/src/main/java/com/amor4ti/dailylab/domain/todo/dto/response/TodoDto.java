package com.amor4ti.dailylab.domain.todo.dto.response;

import com.amor4ti.dailylab.domain.entity.Member;
import com.amor4ti.dailylab.domain.entity.Todo;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
public class TodoDto {

    private String content;
    private Long categoryId;
    private LocalDate todoDate;
    private LocalDateTime checkedDate;
    private boolean isSystem;
    private boolean isDeleted;

    private Member member;

    @Builder
    public TodoDto(String content, Long categoryId, LocalDate todoDate, LocalDateTime checkedDate, boolean isSystem, boolean isDeleted, Member member) {
        this.content = content;
        this.categoryId = categoryId;
        this.todoDate = todoDate;
        this.checkedDate = checkedDate;
        this.isSystem = isSystem;
        this.isDeleted = isDeleted;
        this.member = member;
    }

    public TodoDto toDto(Todo todo) {

        return TodoDto.builder()
                .content(todo.getContent())
                .categoryId(todo.getCategoryId())
                .todoDate(todo.getTodoDate())
                .checkedDate(todo.getCheckedDate())
                .isSystem(todo.isSystem())
                .isDeleted(todo.isDeleted())
                .member(todo.getMember())
                .build();
    }
}
