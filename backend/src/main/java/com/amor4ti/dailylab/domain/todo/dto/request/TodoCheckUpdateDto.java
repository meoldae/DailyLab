package com.amor4ti.dailylab.domain.todo.dto.request;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
public class TodoCheckUpdateDto {

    Long todoId;
    String checkedDate;

    @Builder
    public TodoCheckUpdateDto(Long todoId, String checkedDate) {
        this.todoId = todoId;
        this.checkedDate = checkedDate;
    }
}
