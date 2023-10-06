package com.amor4ti.dailylab.domain.todo.service;

import com.amor4ti.dailylab.domain.todo.dto.request.RegistTodoDto;
import com.amor4ti.dailylab.domain.todo.dto.response.TodoDto;
import com.amor4ti.dailylab.global.response.CommonResponse;
import com.amor4ti.dailylab.global.response.DataResponse;

public interface TodoService {

    DataResponse getTodoListByMemberId(Long memberId);

    DataResponse getAllTodoList();

    CommonResponse registTodo(RegistTodoDto registTodoDto, Long memberId);
}
