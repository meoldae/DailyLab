package com.amor4ti.dailylab.domain.todo.dto.request;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class TodoContentAndCategoryUpdateDto {

    private Long todoId;
    private String content;
    private Long categoryId;

    @Builder
    public TodoContentAndCategoryUpdateDto(Long todoId, String content, Long categoryId) {
        this.todoId = todoId;
        this.content = content;
        this.categoryId = categoryId;
    }
}
