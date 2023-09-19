package com.amor4ti.dailylab.domain.categoryBlackList.service;

import com.amor4ti.dailylab.domain.categoryBlackList.dto.request.CategoryBlackListRegistDto;
import com.amor4ti.dailylab.global.response.CommonResponse;

public interface CategoryBlackListService {

    CommonResponse black(CategoryBlackListRegistDto categoryBlackListRegistDto, Long memberId);

    CommonResponse cancelBlack(Long categoryId, Long memberId);
}
