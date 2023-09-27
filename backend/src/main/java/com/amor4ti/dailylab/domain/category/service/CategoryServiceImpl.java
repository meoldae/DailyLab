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
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@Slf4j
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService{

    private final ResponseService responseService;
    private final CategoryRepository categoryRepository;

    private final CategoryConverter categoryConverter;

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

    @Override
    public DataResponse getCategoryTreeList() {
        // 카테고리 전체 리스트
        List<Category> categoryList = categoryRepository.findAll();

        // 변환 결과를 저장할 Map
        Map<String, Object> result = new HashMap<>();

        for(Category category : categoryList) {
            String large = category.getLarge();
            String medium = category.getMedium();
            String small = category.getSmall();
            Long categoryId = category.getCategoryId();

            // result Map에 데이터 추가
            categoryConverter.addCategoryToResult(result, large, medium, small, categoryId);
        }

        List<Map<String, Object>> dataList = (List<Map<String, Object>>) result.get("list");
        return responseService.successDataResponse(ResponseStatus.RESPONSE_SUCCESS, dataList);
    }

    @Override
    public String getCategoryName(Long categroyId) {
        Category category = categoryRepository.findByCategoryId(categroyId)
                .orElseThrow(() -> new CustomException(ExceptionStatus.CATEGORY_NOT_FOUND));
        log.info("찾은 카테고리 이름: {}", category.getSmall());
        return category.getSmall();
    }
}
