package com.amor4ti.dailylab.domain.categoryWhiteList.dto.response;

import com.querydsl.core.annotations.QueryProjection;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class CategoryWhiteListDto {

    private Long memberId;

    private Long categoryId;
    private String large;
    private String medium;
    private String small;

    @Builder
    @QueryProjection
    public CategoryWhiteListDto(Long memberId, Long categoryId, String large, String medium, String small) {
        this.memberId = memberId;
        this.categoryId = categoryId;
        this.large = large;
        this.medium = medium;
        this.small = small;
    }
}
