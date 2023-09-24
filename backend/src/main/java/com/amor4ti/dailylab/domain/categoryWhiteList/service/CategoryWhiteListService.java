package com.amor4ti.dailylab.domain.categoryWhiteList.service;

import com.amor4ti.dailylab.global.response.CommonResponse;
import com.amor4ti.dailylab.global.response.DataResponse;

public interface CategoryWhiteListService {

    CommonResponse regist(Long categoryId, Long memberId);

    DataResponse getWhiteListByMemberId(Long memberId);
}
