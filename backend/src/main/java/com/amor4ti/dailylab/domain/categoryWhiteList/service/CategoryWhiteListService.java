package com.amor4ti.dailylab.domain.categoryWhiteList.service;

import com.amor4ti.dailylab.global.response.CommonResponse;

public interface CategoryWhiteListService {

    CommonResponse regist(Long categoryId, Long memberId);
}
