package com.amor4ti.dailylab.domain.todo.dto.request;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class TodoContentUpdateDto {

    private Long todoId;
    private String content;

    @Builder
    public TodoContentUpdateDto(Long todoId, String content) {
        this.todoId = todoId;
        this.content = content;
    }
}
