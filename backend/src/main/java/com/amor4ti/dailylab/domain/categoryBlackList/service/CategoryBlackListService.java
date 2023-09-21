package com.amor4ti.dailylab.domain.categoryBlackList.service;

import com.amor4ti.dailylab.domain.categoryBlackList.dto.request.CategoryBlackListRegistDto;
import com.amor4ti.dailylab.global.response.CommonResponse;

import java.util.List;

public interface CategoryBlackListService {

    CommonResponse black(List<Long> todoIdList, Long memberId);

    CommonResponse cancelBlack(Long categoryId, Long memberId);
}
