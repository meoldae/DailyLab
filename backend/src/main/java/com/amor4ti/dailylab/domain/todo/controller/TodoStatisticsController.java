package com.amor4ti.dailylab.domain.todo.controller;

import com.amor4ti.dailylab.domain.todo.service.TodoStatisticsService;
import com.amor4ti.dailylab.global.response.DataResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;

@RestController
@RequestMapping("/todo/statistics")
@RequiredArgsConstructor
public class TodoStatisticsController {

    private final TodoStatisticsService todoStatisticsService;

    @GetMapping
    public DataResponse getTodoSummary(Authentication authentication,
                                       @RequestParam("state") String state,
                                       @RequestParam("startDate") LocalDate startDate,
                                       @RequestParam("endDate") LocalDate endDate){
        Long memberId = Long.parseLong(authentication.getName());

        return todoStatisticsService.getTodoSummary(memberId, state, startDate, endDate);
    }
}
