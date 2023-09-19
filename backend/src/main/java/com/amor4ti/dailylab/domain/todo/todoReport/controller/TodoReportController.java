package com.amor4ti.dailylab.domain.todo.todoReport.controller;

import com.amor4ti.dailylab.domain.todo.todoReport.service.TodoReportService;
import com.amor4ti.dailylab.global.response.CommonResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/todo/report")
@RequiredArgsConstructor
public class TodoReportController {

    private final TodoReportService todoReportService;

    @GetMapping("/calculate")
    public CommonResponse finishToday(Authentication authentication) {
        Long memberId = Long.parseLong(authentication.getName());

        return todoReportService.finishToday(memberId);
    }
}
