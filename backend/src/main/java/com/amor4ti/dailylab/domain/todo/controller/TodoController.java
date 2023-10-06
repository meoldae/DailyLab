package com.amor4ti.dailylab.domain.todo.controller;

import com.amor4ti.dailylab.domain.todo.dto.request.TodoCheckUpdateDto;
import com.amor4ti.dailylab.domain.todo.dto.request.TodoContentAndCategoryUpdateDto;
import com.amor4ti.dailylab.domain.todo.dto.request.TodoRegistDto;
import com.amor4ti.dailylab.domain.todo.service.TodoService;
import com.amor4ti.dailylab.global.response.CommonResponse;
import com.amor4ti.dailylab.global.response.DataResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;

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

    @GetMapping("/{todoDate}")
    public DataResponse getPartTodoListByMemberIdAndTodoDate(@PathVariable LocalDate todoDate, Authentication authentication) {
        Long memberId = Long.parseLong(authentication.getName());

        return todoService.getPartTodoListByMemberIdAndTodoDate(todoDate, memberId);
    }

    @GetMapping("/full/{todoDate}")
    public DataResponse getFullTodoListByMemberIdAndTodoDate(@PathVariable LocalDate todoDate, Authentication authentication){
        Long memberId = Long.parseLong(authentication.getName());

        return todoService.getFullTodoListByMemberIdAndTodoDate(todoDate, memberId);
    }

    @GetMapping("/all")
    public DataResponse getAllTodoList() {

        return todoService.getAllTodoList();
    }

    @PostMapping("")
    public DataResponse registTodo(@RequestBody TodoRegistDto todoRegistDto, Authentication authentication) {
        Long memberId = Long.parseLong(authentication.getName());

        return todoService.registTodo(todoRegistDto, memberId);
    }

    @PutMapping("/delete/{todoId}")
        public CommonResponse deleteTodo(@PathVariable Long todoId, Authentication authentication) {
            Long memberId = Long.parseLong(authentication.getName());

            return todoService.deleteTodo(memberId, todoId);
    }

    @PutMapping("/check")
    public CommonResponse changeCheckTodo(@RequestBody TodoCheckUpdateDto todoCheckUpdateDto, Authentication authentication) {
        Long memberId = Long.parseLong(authentication.getName());

        return todoService.changeCheckTodo(memberId, todoCheckUpdateDto);
    }

    @PutMapping("/change")
    public DataResponse changeTodoContentAndCategory(@RequestBody TodoContentAndCategoryUpdateDto todoContentAndCategoryUpdateDto, Authentication authentication) {
        Long memberId = Long.parseLong(authentication.getName());

        return todoService.changeTodoContentAndCategory(todoContentAndCategoryUpdateDto, memberId);
    }

//    @GetMapping("/recommend/{todoDate}")
//    public DataResponse recommendTodo(@PathVariable("todoDate") String todoDate, Authentication authentication) {
//        Long memberId = Long.parseLong(authentication.getName());
//
//        return todoService.recommendTodo(memberId, todoDate);
//    }
}
