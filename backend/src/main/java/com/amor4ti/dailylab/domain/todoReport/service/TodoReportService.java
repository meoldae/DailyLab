package com.amor4ti.dailylab.domain.todoReport.service;

import com.amor4ti.dailylab.global.response.CommonResponse;

import java.time.LocalDate;

public interface TodoReportService {

    CommonResponse finishToday(Long memberId, LocalDate todoDate);
}
