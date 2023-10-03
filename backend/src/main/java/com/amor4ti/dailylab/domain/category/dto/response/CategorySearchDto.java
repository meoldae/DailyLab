package com.amor4ti.dailylab.domain.category.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
public class CategorySearchDto {
    private Long categoryId;
    private String large;
    private String name;
}
