package com.amor4ti.dailylab.domain.category.dto.response;

import com.amor4ti.dailylab.domain.entity.category.Category;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class CategoryDto {

    private String large;
    private String medium;
    private String small;

    private int recommendationFit;

    @Builder
    public CategoryDto(String large, String medium, String small, int recommendationFit) {
        this.large = large;
        this.medium = medium;
        this.small = small;
        this.recommendationFit = recommendationFit;
    }

    public CategoryDto toDto(Category category) {

        return CategoryDto.builder()
                .large(category.getLarge())
                .medium(category.getMedium())
                .small(category.getSmall())
                .recommendationFit(category.getRecommendationFit())
                .build();
    }
}
