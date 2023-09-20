package com.amor4ti.dailylab.domain.category.service;

import com.amor4ti.dailylab.domain.category.dto.response.CategoryDto;
import com.amor4ti.dailylab.domain.category.repository.CategoryRepository;
import com.amor4ti.dailylab.domain.entity.category.Category;
import com.amor4ti.dailylab.global.exception.CustomException;
import com.amor4ti.dailylab.global.exception.ExceptionStatus;
import com.amor4ti.dailylab.global.response.DataResponse;
import com.amor4ti.dailylab.global.response.ResponseService;
import com.amor4ti.dailylab.global.response.ResponseStatus;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService{

    private final ResponseService responseService;
    private final CategoryRepository categoryRepository;

    @Override
    public DataResponse getOneCategory(Long categoryId) {
        Category category = categoryRepository.findByCategoryId(categoryId)
                .orElseThrow(() -> new CustomException(ExceptionStatus.CATEGORY_NOT_FOUND));

        CategoryDto categoryDto = new CategoryDto().toDto(category);

        return responseService.successDataResponse(ResponseStatus.RESPONSE_SUCCESS, categoryDto);
    }

    @Override
    public DataResponse getCategoryList() {
        List<CategoryDto> categoryDtoList = new ArrayList<>();
        List<Category> categoryList = categoryRepository.findAll();

        for (Category category : categoryList) {
            CategoryDto categoryDto = new CategoryDto().toDto(category);

            categoryDtoList.add(categoryDto);
        }

        return responseService.successDataResponse(ResponseStatus.RESPONSE_SUCCESS, categoryDtoList);
    }
}
