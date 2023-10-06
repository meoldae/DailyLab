package com.amor4ti.dailylab.domain.todo.dto.request;

import com.amor4ti.dailylab.domain.entity.Todo;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
public class RegistTodoDto {

    private Long categoryId;
    private String content;
    private LocalDate todoDate;
    private boolean isSystem;

    @Builder
    public RegistTodoDto(Long categoryId, String content, LocalDate todoDate, boolean isSystem) {
        this.categoryId = categoryId;
        this.content = content;
        this.todoDate = todoDate;
        this.isSystem = isSystem;
    }

    public Todo toEntity(Long memberId) {

        return Todo.builder()
                .todoId(memberId)
                .categoryId(this.categoryId)
                .content(this.content)
                .todoDate(this.todoDate)
                .checkedDate(null)
                .isSystem(this.isSystem)
                .isDeleted(false)
                .build();
    }
}
