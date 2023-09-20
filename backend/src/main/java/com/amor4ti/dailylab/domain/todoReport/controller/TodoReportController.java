package com.amor4ti.dailylab.domain.todoReport.controller;

import com.amor4ti.dailylab.domain.todoReport.service.TodoReportService;
import com.amor4ti.dailylab.global.response.CommonResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;

@RestController
@RequestMapping("/todo/report")
@RequiredArgsConstructor
public class TodoReportController {

    private final TodoReportService todoReportService;

    @GetMapping("/calculate/{todoDate}")
    public CommonResponse finishToday(@PathVariable("todoDate") LocalDate todoDate, Authentication authentication) {
        Long memberId = Long.parseLong(authentication.getName());

        return todoReportService.finishToday(memberId, todoDate);
    }
}
