package com.amor4ti.dailylab.domain.todo.service;

import com.amor4ti.dailylab.global.response.CommonResponse;
import com.amor4ti.dailylab.global.response.DataResponse;

import java.time.LocalDate;

public interface TodoStatisticsService {
    Object connection(Object data, String url);
    DataResponse getOtherList(Long memberId);
    DataResponse getGroupTodoSummary(Long memberId, LocalDate startDate, LocalDate endDate);
    DataResponse getPersonalTodoSummary(Long memberId, LocalDate startDate, LocalDate endDate);
    DataResponse getAllTodoSummary(Long memberId, LocalDate startDate, LocalDate endDate);
}
