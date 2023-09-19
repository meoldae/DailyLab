package com.amor4ti.dailylab.domain.todo.service;

import com.amor4ti.dailylab.domain.entity.Member;
import com.amor4ti.dailylab.domain.entity.Todo;
import com.amor4ti.dailylab.domain.member.repository.MemberRepository;
import com.amor4ti.dailylab.domain.todo.dto.request.RegistTodoDto;
import com.amor4ti.dailylab.domain.todo.dto.request.UpdateTodoDto;
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
import org.apache.catalina.User;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class TodoServiceImpl implements TodoService{

    private final TodoRepository todoRepository;
    private final MemberRepository memberRepository;
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
    @Transactional
    public CommonResponse registTodo(RegistTodoDto registTodoDto, Long memberId) {
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new CustomException(ExceptionStatus.MEMBER_NOT_FOUND));

        Todo todo = registTodoDto.toEntity(member);
        todoRepository.save(todo);

        return responseService.successResponse(ResponseStatus.RESPONSE_SUCCESS);
    }

    @Override
    public CommonResponse deleteTodo(Long memberId, UpdateTodoDto updateTodoDto) {
        Todo todo = todoRepository.findByMemberIdAndCategoryIdAndTodoDate(memberId, updateTodoDto.getCategoryId(), updateTodoDto.getTodoDate())
                .orElseThrow(() -> new CustomException(ExceptionStatus.TODO_NOT_FOUND));

        todo.deleteTodo();
        todoRepository.save(todo);

        return responseService.successResponse(ResponseStatus.RESPONSE_SUCCESS);
    }

    @Override
    public CommonResponse checkTodo(Long memberId, UpdateTodoDto updateTodoDto) {
        Todo todo = todoRepository.findByMemberIdAndCategoryIdAndTodoDate(memberId, updateTodoDto.getCategoryId(), updateTodoDto.getTodoDate())
                .orElseThrow(() -> new CustomException(ExceptionStatus.TODO_NOT_FOUND));

        todo.checkTodo();
        todoRepository.save(todo);

        return responseService.successResponse(ResponseStatus.RESPONSE_SUCCESS);
    }
}
