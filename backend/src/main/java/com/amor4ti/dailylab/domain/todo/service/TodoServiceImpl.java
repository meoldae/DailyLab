package com.amor4ti.dailylab.domain.todo.service;

import com.amor4ti.dailylab.domain.category.repository.CategoryRepository;
import com.amor4ti.dailylab.domain.entity.Member;
import com.amor4ti.dailylab.domain.entity.Todo;
import com.amor4ti.dailylab.domain.entity.category.Category;
import com.amor4ti.dailylab.domain.member.repository.MemberRepository;
import com.amor4ti.dailylab.domain.todo.dto.request.TodoCheckUpdateDto;
import com.amor4ti.dailylab.domain.todo.dto.request.TodoRegistDto;
import com.amor4ti.dailylab.domain.todo.dto.request.TodoUpdateDto;
import com.amor4ti.dailylab.domain.todo.dto.response.TodoDto;
import com.amor4ti.dailylab.domain.todo.dto.response.TodoSmallDto;
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
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@Service
@RequiredArgsConstructor
public class TodoServiceImpl implements TodoService{

    private final TodoRepository todoRepository;
    private final MemberRepository memberRepository;
    private final CategoryRepository categoryRepository;

    private final ResponseService responseService;

    @Override
    public DataResponse getTodoListByMemberId(Long memberId) {
        List<TodoDto> todoDtoList = todoRepository.findByMemberId(memberId);

        return responseService.successDataResponse(ResponseStatus.RESPONSE_SUCCESS, todoDtoList);
    }

    @Override
    public DataResponse getPartTodoListByMemberIdAndTodoDate(LocalDate todoDate, Long memberId) {
        List<TodoSmallDto> todoSmallDtoList = todoRepository.findSomedayPartTodoDtoListByMemberIdAndTodoDate(todoDate, memberId);

        return responseService.successDataResponse(ResponseStatus.RESPONSE_SUCCESS, todoSmallDtoList);
    }

    @Override
    public DataResponse getFullTodoListByMemberIdAndTodoDate(LocalDate todoDate, Long memberId) {
        List<TodoDto> todoDtoList = todoRepository.findSomedayFullTodoDtoListByMemberIdAndTodoDate(todoDate, memberId);

        return responseService.successDataResponse(ResponseStatus.RESPONSE_SUCCESS, todoDtoList);
    }

    @Override
    public DataResponse getAllTodoList() {
        List<TodoDto> todoDtoList = new ArrayList<>();
        List<Todo> todoList = todoRepository.findAll();

        for (Todo todo : todoList) {
            Category category = categoryRepository.findByCategoryId(todo.getCategory().getCategoryId())
                    .orElseThrow(() -> new CustomException(ExceptionStatus.CATEGORY_NOT_FOUND));

            TodoDto todoDto = new TodoDto().toDto(todo, category);

            todoDtoList.add(todoDto);
        }

        return responseService.successDataResponse(ResponseStatus.RESPONSE_SUCCESS, todoDtoList);
    }

    @Override
    @Transactional
    public CommonResponse registTodo(TodoRegistDto todoRegistDto, Long memberId) {
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new CustomException(ExceptionStatus.MEMBER_NOT_FOUND));

        Category category = categoryRepository.findByCategoryId(todoRegistDto.getCategoryId())
                .orElseThrow(() -> new CustomException(ExceptionStatus.CATEGORY_NOT_FOUND));

        Todo todo = todoRegistDto.toEntity(member, category);
        todoRepository.save(todo);

        return responseService.successResponse(ResponseStatus.TODO_REGIST_SUCCESS);
    }

    @Override
    @Transactional
    public CommonResponse deleteTodo(Long memberId, List<Long> todoIdList) {
        for (Long todoId : todoIdList) {
            Todo todo = todoRepository.findByTodoId(todoId)
                    .orElseThrow(() -> new CustomException(ExceptionStatus.TODO_NOT_FOUND));

            todo.deleteTodo();
            todoRepository.save(todo);
        }

        return responseService.successResponse(ResponseStatus.RESPONSE_SUCCESS);
    }

    @Override
    @Transactional
    public CommonResponse changeCheckTodo(Long memberId, TodoCheckUpdateDto todoCheckUpdateDto) {
        Todo todo = todoRepository.findByTodoId(todoCheckUpdateDto.getTodoId())
                .orElseThrow(() -> new CustomException(ExceptionStatus.TODO_NOT_FOUND));

        System.out.println(todoCheckUpdateDto.getCheckedDate());

        todo.checkTodo(todoCheckUpdateDto.getCheckedDate());
        todoRepository.save(todo);

        return responseService.successResponse(ResponseStatus.RESPONSE_SUCCESS);
    }

    @Override
    public CommonResponse recommendTodo(Long memberId, String todoDate) {
        String fastApiUrl = "http://localhost:8181/data/info";

        Map<String, Object> data = new HashMap<>();
        data.put("memberId", memberId);
        data.put("todoDate", todoDate);

        RestTemplate restTemplate = new RestTemplate();
        System.out.println(2);
        String response = restTemplate.postForObject(fastApiUrl, data, String.class);
        System.out.println(3);

        System.out.println(response);

        return responseService.successResponse(ResponseStatus.RESPONSE_SUCCESS);
    }
}
