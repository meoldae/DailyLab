package com.amor4ti.dailylab.domain.todo.todoReport.service;

import com.amor4ti.dailylab.global.response.CommonResponse;

public interface TodoReportService {

    CommonResponse finishToday(Long memberId);
}
