package com.amor4ti.dailylab.domain.todo.dto.request;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Getter
@NoArgsConstructor
public class TodoUpdateDto {

    Long categoryId;
    LocalDate todoDate;

    @Builder
    public TodoUpdateDto(Long categoryId, LocalDate todoDate) {
        this.categoryId = categoryId;
        this.todoDate = todoDate;
    }
}
