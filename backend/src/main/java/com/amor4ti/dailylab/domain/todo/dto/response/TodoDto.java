package com.amor4ti.dailylab.domain.todo.dto.response;

import com.amor4ti.dailylab.domain.entity.Todo;
import com.amor4ti.dailylab.domain.entity.category.Category;
import com.querydsl.core.annotations.QueryProjection;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
public class TodoDto {

    private Long todoId;
    private String content;
    private Long categoryId;
    private String large;
    private String medium;
    private String small;
    private LocalDate todoDate;
    private LocalDateTime checkedDate;
    private boolean check;
    private boolean isSystem;
    private boolean isDeleted;

    private Long memberId;
    private String username;

    @QueryProjection
    @Builder
    public TodoDto(Long todoId, String content, Long categoryId, String large, String medium, String small, LocalDate todoDate, LocalDateTime checkedDate, boolean check, boolean isSystem, boolean isDeleted, Long memberId, String username) {
        this.todoId = todoId;
        this.content = content;
        this.categoryId = categoryId;
        this.large = large;
        this.medium = medium;
        this.small = small;
        this.todoDate = todoDate;
        this.checkedDate = checkedDate;
        this.check = check;
        this.isSystem = isSystem;
        this.isDeleted = isDeleted;
        this.memberId = memberId;
        this.username = username;
    }

    public TodoDto toDto(Todo todo, Category category) {
        boolean check = false;

        check = todo.getCheckedDate() != null;


        return TodoDto.builder()
                .todoId(todo.getTodoId())
                .content(todo.getContent())
                .categoryId(category.getCategoryId())
                .large(category.getLarge())
                .medium(category.getMedium())
                .small(category.getSmall())
                .todoDate(todo.getTodoDate())
                .checkedDate(todo.getCheckedDate())
                .check(check)
                .isSystem(todo.isSystem())
                .isDeleted(todo.isDeleted())
                .memberId(todo.getMember().getMemberId())
                .username(todo.getMember().getUsername())
                .build();
    }
}
