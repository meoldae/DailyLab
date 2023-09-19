package com.amor4ti.dailylab.domain.todo.service;

import com.amor4ti.dailylab.domain.todo.dto.request.TodoRegistDto;
import com.amor4ti.dailylab.domain.todo.dto.request.TodoUpdateDto;
import com.amor4ti.dailylab.global.response.CommonResponse;
import com.amor4ti.dailylab.global.response.DataResponse;

public interface TodoService {

    DataResponse getTodoListByMemberId(Long memberId);

    DataResponse getAllTodoList();

    CommonResponse registTodo(TodoRegistDto todoRegistDto, Long memberId);

    CommonResponse deleteTodo(Long memberId, TodoUpdateDto todoUpdateDto);

    CommonResponse checkTodo(Long memberId, TodoUpdateDto todoUpdateDto
    );
}
