package com.amor4ti.dailylab.domain.categoryWhiteList.service;

import com.amor4ti.dailylab.domain.category.repository.CategoryRepository;
import com.amor4ti.dailylab.domain.categoryWhiteList.repository.CategoryWhiteListRepository;
import com.amor4ti.dailylab.domain.entity.category.Category;
import com.amor4ti.dailylab.domain.entity.category.CategoryWhiteList;
import com.amor4ti.dailylab.domain.entity.category.MemberCategoryId;
import com.amor4ti.dailylab.global.exception.CustomException;
import com.amor4ti.dailylab.global.exception.ExceptionStatus;
import com.amor4ti.dailylab.global.response.CommonResponse;
import com.amor4ti.dailylab.global.response.ResponseService;
import com.amor4ti.dailylab.global.response.ResponseStatus;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@Slf4j
@RequiredArgsConstructor
public class CategoryWhiteListServiceImpl implements CategoryWhiteListService {

    private final CategoryWhiteListRepository categoryWhiteListRepository;
    private final CategoryRepository categoryRepository;

    private final ResponseService responseService;

    @Override
    public CommonResponse regist(Long categoryId, Long memberId) {
        MemberCategoryId memberCategoryId = MemberCategoryId.builder()
                .categoryId(categoryId)
                .memberId(memberId)
                .build();

        CategoryWhiteList categoryWhiteList = CategoryWhiteList.builder()
                .id(memberCategoryId)
                .build();

        Category category = categoryRepository.findByCategoryId(categoryId)
                .orElseThrow(() -> new CustomException(ExceptionStatus.CATEGORY_NOT_FOUND));

        Optional<CategoryWhiteList> optional = categoryWhiteListRepository.findByMemberCategoryId(memberCategoryId);

        // 추천 적합도가 0이고 whiteList에 값이 없는 경우
        if(category.getRecommendationFit() == 0 && optional.isEmpty())
            categoryWhiteListRepository.save(categoryWhiteList);

        return responseService.successResponse(ResponseStatus.RESPONSE_SUCCESS);
    }
}
