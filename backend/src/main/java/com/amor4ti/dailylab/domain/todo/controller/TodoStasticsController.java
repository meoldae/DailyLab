package com.amor4ti.dailylab.domain.todo.controller;

import com.amor4ti.dailylab.domain.todo.service.TodoStasticsService;
import com.amor4ti.dailylab.global.response.CommonResponse;
import com.amor4ti.dailylab.global.response.DataResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/todo")
@RequiredArgsConstructor
public class TodoStasticsController {

    private final TodoStasticsService todoStasticsService;

    @GetMapping("/stastics")
    public DataResponse getUserList(Authentication authentication){
        Long memberId = Long.parseLong(authentication.getName());

        return todoStasticsService.getOtherList(memberId);
    }
}
