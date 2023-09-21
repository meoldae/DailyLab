package com.amor4ti.dailylab.domain.todo.service;

import com.amor4ti.dailylab.domain.todo.dto.request.TodoCheckUpdateDto;
import com.amor4ti.dailylab.domain.todo.dto.request.TodoRegistDto;
import com.amor4ti.dailylab.domain.todo.dto.request.TodoUpdateDto;
import com.amor4ti.dailylab.global.response.CommonResponse;
import com.amor4ti.dailylab.global.response.DataResponse;

import java.time.LocalDate;

public interface TodoService {

    DataResponse getTodoListByMemberId(Long memberId);

    DataResponse getPartTodoListByMemberIdAndTodoDate(LocalDate todoDate, Long memberId);

    DataResponse getFullTodoListByMemberIdAndTodoDate(LocalDate todoDate, Long memberId);

    DataResponse getAllTodoList();

    CommonResponse registTodo(TodoRegistDto todoRegistDto, Long memberId);

    CommonResponse deleteTodo(Long memberId, TodoUpdateDto todoUpdateDto);

    CommonResponse changeCheckTodo(Long memberId, TodoCheckUpdateDto todoCheckUpdateDto);

    CommonResponse recommendTodo(Long memberId, String todoDate);
}
