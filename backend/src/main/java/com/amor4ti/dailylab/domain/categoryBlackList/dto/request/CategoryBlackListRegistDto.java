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

    private Long categoryId;
    private LocalDate todoDate;

    @Builder
    public CategoryBlackListRegistDto(Long categoryId, LocalDate todoDate) {
        this.categoryId = categoryId;
        this.todoDate = todoDate;
    }
}
