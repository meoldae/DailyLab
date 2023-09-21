package com.amor4ti.dailylab.domain.todo.dto.response;

import com.querydsl.core.annotations.QueryProjection;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class TodoRecommendedDto {

    private Long categoryId;
    private String large;
    private String medium;
    private String small;
    private boolean check;

    @Builder
    @QueryProjection
    public TodoRecommendedDto(Long categoryId, String large, String medium, String small, boolean check) {
        this.categoryId = categoryId;
        this.large = large;
        this.medium = medium;
        this.small = small;
        this.check = check;
    }
}
