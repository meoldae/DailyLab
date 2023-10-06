package com.amor4ti.dailylab.domain.category.mapper;

import com.amor4ti.dailylab.domain.category.dto.response.CategorySearchDto;
import com.amor4ti.dailylab.domain.entity.category.Category;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface CategoryMapper {
    @Mapping(source = "small", target = "name")
    CategorySearchDto categoryToCategorySearchDto(Category category);
}
