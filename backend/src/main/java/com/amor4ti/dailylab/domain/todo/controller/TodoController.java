package com.amor4ti.dailylab.domain.todo.controller;

import com.amor4ti.dailylab.domain.entity.Member;
import com.amor4ti.dailylab.domain.todo.dto.request.RegistTodoDto;
import com.amor4ti.dailylab.domain.todo.dto.request.UpdateTodoDto;
import com.amor4ti.dailylab.domain.todo.service.TodoService;
import com.amor4ti.dailylab.global.response.CommonResponse;
import com.amor4ti.dailylab.global.response.DataResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/todo")
@RequiredArgsConstructor
public class TodoController {

    private final TodoService todoService;

    @GetMapping("")
    public DataResponse getTodoListByMemberId(Authentication authentication) {
        Long memberId = Long.parseLong(authentication.getName());

        return todoService.getTodoListByMemberId(memberId);
    }

    @GetMapping("/all")
    public DataResponse getAllTodoList() {

        return todoService.getAllTodoList();
    }

    @PostMapping("")
    public CommonResponse registTodo(@RequestBody RegistTodoDto registTodoDto, Authentication authentication) {
        Long memberId = Long.parseLong(authentication.getName());

        return todoService.registTodo(registTodoDto, memberId);
    }

    @PutMapping("/delete")
    public CommonResponse deleteTodo(@RequestBody UpdateTodoDto updateTodoDto, Authentication authentication) {
        Long memberId = Long.parseLong(authentication.getName());

        return todoService.deleteTodo(memberId, updateTodoDto);
    }

    @PutMapping("/check")
    public CommonResponse checkTodo(@RequestBody UpdateTodoDto updateTodoDto, Authentication authentication) {
        Long memberId = Long.parseLong(authentication.getName());

        return todoService.checkTodo(memberId, updateTodoDto);
    }
}
