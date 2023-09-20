package com.amor4ti.dailylab.domain.todo.dto.response;

import com.amor4ti.dailylab.domain.entity.Member;
import com.amor4ti.dailylab.domain.entity.Todo;
import com.querydsl.core.annotations.QueryProjection;
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

    private Long memberId;
    private String username;

    @QueryProjection
    @Builder
    public TodoDto(String content, Long categoryId, LocalDate todoDate, LocalDateTime checkedDate, boolean isSystem, boolean isDeleted, Long memberId, String username) {
        this.content = content;
        this.categoryId = categoryId;
        this.todoDate = todoDate;
        this.checkedDate = checkedDate;
        this.isSystem = isSystem;
        this.isDeleted = isDeleted;
        this.memberId = memberId;
        this.username = username;
    }

    public TodoDto toDto(Todo todo) {

        return TodoDto.builder()
                .content(todo.getContent())
                .categoryId(todo.getCategoryId())
                .todoDate(todo.getTodoDate())
                .checkedDate(todo.getCheckedDate())
                .isSystem(todo.isSystem())
                .isDeleted(todo.isDeleted())
                .memberId(todo.getMember().getMemberId())
                .username(todo.getMember().getUsername())
                .build();
    }
}
