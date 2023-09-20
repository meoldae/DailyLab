package com.amor4ti.dailylab.domain.todo.dto.response;

import com.querydsl.core.annotations.QueryProjection;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
public class TodoSmallDto {

    private Long todoId;
    private String content;
    private boolean check;

    @QueryProjection
    @Builder
    public TodoSmallDto(Long todoId, String content, boolean check) {
        this.todoId = todoId;
        this.content = content;
        this.check = check;
    }
}
