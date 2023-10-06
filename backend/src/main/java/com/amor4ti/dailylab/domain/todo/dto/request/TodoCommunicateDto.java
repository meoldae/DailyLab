package com.amor4ti.dailylab.domain.todo.dto.request;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class TodoCommunicateDto {

    private Long memberId;

    private String todoDate;

    @Builder
    public TodoCommunicateDto(Long memberId, String todoDate) {
        this.memberId = memberId;
        this.todoDate = todoDate;
    }
}
