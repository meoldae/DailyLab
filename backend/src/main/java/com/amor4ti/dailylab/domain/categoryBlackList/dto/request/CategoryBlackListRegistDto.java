package com.amor4ti.dailylab.domain.categoryBlackList.dto.request;

import com.amor4ti.dailylab.domain.entity.category.CategoryBlackList;
import com.amor4ti.dailylab.domain.entity.category.MemberCategoryId;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Getter
@NoArgsConstructor
public class CategoryBlackListRegistDto {

    private Long todoId;
    private LocalDate todoDate;

    @Builder
    public CategoryBlackListRegistDto(Long todoId, LocalDate todoDate) {
        this.todoId = todoId;
        this.todoDate = todoDate;
    }
}
