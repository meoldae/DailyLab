package com.amor4ti.dailylab.domain.todo.dto.request;

import com.amor4ti.dailylab.domain.entity.Member;
import com.amor4ti.dailylab.domain.entity.Todo;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Getter
@NoArgsConstructor
public class TodoRegistDto {

    private Long categoryId;
    private String content;
    private LocalDate todoDate;

    @Builder
    public TodoRegistDto(Long categoryId, String content, LocalDate todoDate) {
        this.categoryId = categoryId;
        this.content = content;
        this.todoDate = todoDate;
    }

    public Todo toEntity(Member member) {

        return Todo.builder()
                .member(member)
                .categoryId(this.categoryId)
                .content(this.content)
                .todoDate(this.todoDate)
                .checkedDate(null)
                .isSystem(true)
                .isDeleted(false)
                .build();
    }
}
