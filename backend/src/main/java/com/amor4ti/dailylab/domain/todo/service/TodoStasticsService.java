package com.amor4ti.dailylab.domain.todo.service;

import com.amor4ti.dailylab.global.response.CommonResponse;
import com.amor4ti.dailylab.global.response.DataResponse;

public interface TodoStasticsService {
    Object connection(Object data, String url);
    DataResponse getOtherList(Long memberId);
}
