package com.amor4ti.dailylab.domain.todo.service;

import com.amor4ti.dailylab.domain.entity.Todo;
import com.amor4ti.dailylab.domain.todo.dto.request.RegistTodoDto;
import com.amor4ti.dailylab.domain.todo.dto.response.TodoDto;
import com.amor4ti.dailylab.domain.todo.repository.TodoReportRepository;
import com.amor4ti.dailylab.domain.todo.repository.TodoRepository;
import com.amor4ti.dailylab.global.exception.CustomException;
import com.amor4ti.dailylab.global.exception.ExceptionStatus;
import com.amor4ti.dailylab.global.response.CommonResponse;
import com.amor4ti.dailylab.global.response.DataResponse;
import com.amor4ti.dailylab.global.response.ResponseService;
import com.amor4ti.dailylab.global.response.ResponseStatus;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class TodoServiceImpl implements TodoService{

    private final TodoRepository todoRepository;
    private final TodoReportRepository todoReportRepository;
    private final ResponseService responseService;

    @Override
    public DataResponse getTodoListByMemberId(Long memberId) {
        List<TodoDto> todoDtoListByMemberId = new ArrayList<>();
        List<Todo> todoListByMemberId = todoRepository.findByMemberId(memberId);

        for (Todo todo : todoListByMemberId) {
            TodoDto todoDto = new TodoDto().toDto(todo);

            todoDtoListByMemberId.add(todoDto);
        }

        return responseService.successDataResponse(ResponseStatus.RESPONSE_SUCCESS, todoDtoListByMemberId);
    }

    @Override
    public DataResponse getAllTodoList() {
        List<TodoDto> todoDtoList = new ArrayList<>();
        List<Todo> todoList = todoRepository.findAll();

        for (Todo todo : todoList) {
            TodoDto todoDto = new TodoDto().toDto(todo);

            todoDtoList.add(todoDto);
        }

        return responseService.successDataResponse(ResponseStatus.RESPONSE_SUCCESS, todoDtoList);
    }

    @Override
    public CommonResponse registTodo(RegistTodoDto registTodoDto, Long memberId) {
        Todo todo = registTodoDto.toEntity(memberId);
        todoRepository.save(todo);

//        todoReportRepository.findBy

        return responseService.successResponse(ResponseStatus.RESPONSE_SUCCESS);
    }
}
