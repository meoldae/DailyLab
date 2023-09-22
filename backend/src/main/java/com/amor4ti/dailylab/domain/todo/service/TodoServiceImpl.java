package com.amor4ti.dailylab.domain.todo.service;

import com.amor4ti.dailylab.domain.category.repository.CategoryRepository;
import com.amor4ti.dailylab.domain.categoryBlackList.repository.CategoryBlackListRepository;
import com.amor4ti.dailylab.domain.entity.Member;
import com.amor4ti.dailylab.domain.entity.Todo;
import com.amor4ti.dailylab.domain.entity.category.Category;
import com.amor4ti.dailylab.domain.entity.category.CategoryBlackList;
import com.amor4ti.dailylab.domain.entity.category.MemberCategoryId;
import com.amor4ti.dailylab.domain.member.repository.MemberRepository;
import com.amor4ti.dailylab.domain.todo.dto.request.TodoCheckUpdateDto;
import com.amor4ti.dailylab.domain.todo.dto.request.TodoContentUpdateDto;
import com.amor4ti.dailylab.domain.todo.dto.request.TodoRegistDto;
import com.amor4ti.dailylab.domain.todo.dto.response.TodoDto;
import com.amor4ti.dailylab.domain.todo.dto.response.TodoRecommendedDto;
import com.amor4ti.dailylab.domain.todo.dto.response.TodoSmallDto;
import com.amor4ti.dailylab.domain.todo.repository.TodoRepository;
import com.amor4ti.dailylab.domain.todoReport.service.TodoReportService;
import com.amor4ti.dailylab.global.exception.CustomException;
import com.amor4ti.dailylab.global.exception.ExceptionStatus;
import com.amor4ti.dailylab.global.response.CommonResponse;
import com.amor4ti.dailylab.global.response.DataResponse;
import com.amor4ti.dailylab.global.response.ResponseService;
import com.amor4ti.dailylab.global.response.ResponseStatus;
import com.amor4ti.dailylab.global.util.JsonConverter;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDate;
import java.util.*;

@Slf4j
@Service
@RequiredArgsConstructor
public class TodoServiceImpl implements TodoService{

    @Value("${data-server-url}")
    private String DATA_SERVER_URL;

    private final TodoRepository todoRepository;
    private final MemberRepository memberRepository;
    private final CategoryRepository categoryRepository;
    private final CategoryBlackListRepository categoryBlackListRepository;

    private final ResponseService responseService;
    private final TodoReportService todoReportService;

    private final JsonConverter jsonConverter;

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
    public DataResponse registTodo(TodoRegistDto todoRegistDto, Long memberId) {
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new CustomException(ExceptionStatus.MEMBER_NOT_FOUND));

        Category category = categoryRepository.findByCategoryId(todoRegistDto.getCategoryId())
                .orElseThrow(() -> new CustomException(ExceptionStatus.CATEGORY_NOT_FOUND));

        MemberCategoryId memberCategoryId = MemberCategoryId.builder()
                        .categoryId(todoRegistDto.getCategoryId())
                        .memberId(memberId)
                        .build();

        Optional<CategoryBlackList> blackListOptional = categoryBlackListRepository.findByMemberCategoryId(memberCategoryId);

        // 이미 블랙리스트에 있는 경우 등록 X
        if(blackListOptional.isPresent() && !blackListOptional.get().isRemove())
            throw new CustomException(ExceptionStatus.CATEGORY_BLACKLIST_ALREADY_FALSE);

        Optional<Todo> todayTodoOptional = todoRepository.findByMemberIdAndCategoryIdAndTodoDate(memberId, todoRegistDto.getCategoryId(), todoRegistDto.getTodoDate());

        // 이미 오늘 등록한 카테고리의 todo인 경우
        if(todayTodoOptional.isPresent())
            throw new CustomException(ExceptionStatus.TODO_ALREADY_REGIST_TODAY);

        Todo todo = todoRegistDto.toEntity(member, category);
        todoRepository.save(todo);

        return responseService.successDataResponse(ResponseStatus.TODO_REGIST_SUCCESS, todo.getTodoId());
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

        todo.checkTodo(todoCheckUpdateDto.getCheckedDate());
        todoRepository.save(todo);

        return responseService.successResponse(ResponseStatus.RESPONSE_SUCCESS);
    }

    @Override
    @Transactional
    public DataResponse recommendTodo(Long memberId, String todoDate) {
        log.info("todo 추천 로직 시작");
        
        // 우선 하루 마무리
        // 마무리는 언제 추천 요청을 하든 간에 추천 todo 수행일 -1에 실행된다.
        todoReportService.finishToday(memberId, LocalDate.parse(todoDate).minusDays(1));

        // FastAPI와 통신
        String response = communicateWithFastAPI(memberId, todoDate);

        // String -> JSON
        JsonObject jsonObject = jsonConverter.converter(response);

        List<Long> CategoryIdList = new ArrayList<>();
        List<Double> ScoreList = new ArrayList<>();

        for (Map.Entry<String, JsonElement> entry : jsonObject.entrySet()) {
            // 카테고리 ID (랭킹)
            CategoryIdList.add(Long.parseLong(entry.getKey()));
            
            // 점수 (랭킹)
            ScoreList.add(entry.getValue().getAsDouble());
        }

        // 빈 추천 Todo 객체
        List<TodoRecommendedDto> todoRecommendedDtoList = new ArrayList<>();

        int cnt = 0;
        log.info("categoryIdList의 수 : " + CategoryIdList.size());
        for (Long categoryId : CategoryIdList) {
            // 일단 5개만
            if(cnt == 5)
                break;

            // 블랙리스트 체크 로직
            MemberCategoryId memberCategoryId = MemberCategoryId.builder()
                    .memberId(memberId)
                    .categoryId(categoryId)
                    .build();

            Optional<CategoryBlackList> optionalBlackList = categoryBlackListRepository.findByMemberCategoryId(memberCategoryId);
            
            if(optionalBlackList.isPresent() && !optionalBlackList.get().isRemove())
                continue;

            cnt++;

            Category category = categoryRepository.findByCategoryId(categoryId)
                    .orElseThrow(() -> new CustomException(ExceptionStatus.CATEGORY_NOT_FOUND));

            // db에 추천 db 등록 로직
            TodoRegistDto todoRegistDto = TodoRegistDto.builder()
                    .categoryId(categoryId)
                    .content(category.getSmall())
                    .todoDate(LocalDate.parse(todoDate))
                    .build();
            log.info("todoDate : " + todoRegistDto.getTodoDate());
            log.info("categoryId : " + todoRegistDto.getCategoryId());

            DataResponse dataResponse = registTodo(todoRegistDto, memberId);

            Long newTodoId = (Long) dataResponse.getData();

            TodoRecommendedDto todoRecommendedDto = todoRepository.findTodoRecommendedDtoByMemberIdAndTodoId(memberId, newTodoId)
                    .orElseThrow(() -> new CustomException(ExceptionStatus.EXCEPTION));

            todoRecommendedDtoList.add(todoRecommendedDto);
        }

        log.info("추천 todo 개수 : " + todoRecommendedDtoList.size());
        log.info("todo 추천 로직 종료");

        return responseService.successDataResponse(ResponseStatus.RESPONSE_SUCCESS, todoRecommendedDtoList);
    }

    @Override
    public CommonResponse changeTodoContent(TodoContentUpdateDto todoContentUpdateDto, Long memberId) {
        Todo todo = todoRepository.findByTodoId(todoContentUpdateDto.getTodoId())
                .orElseThrow(() -> new CustomException(ExceptionStatus.TODO_NOT_FOUND));

        if(todo.getMember().getMemberId() != memberId)
            throw new CustomException(ExceptionStatus.TODO_UPDATE_REQUEST_BY_OTHER_USER);

        todo.changeContent(todoContentUpdateDto.getContent());
        todoRepository.save(todo);

        return responseService.successResponse(ResponseStatus.RESPONSE_SUCCESS);
    }

    private String communicateWithFastAPI(Long memberId, String todoDate) {
        log.info("데이터 서버와 통신 시작");
        // fastAPI 요청 주소
//        String fastApiUrl = "http://localhost:8181/todo";
        String fastApiUrl = DATA_SERVER_URL + "/todo";

        // RestTemplate 통신
        Map<String, Object> data = new HashMap<>();
        data.put("memberId", memberId);
        data.put("todoDate", todoDate);
        RestTemplate restTemplate = new RestTemplate();

        // 통신 결과 (FastAPI에서 반환한 값)
        String response = restTemplate.postForObject(fastApiUrl, data, String.class);

        log.info("response : " + response);
        log.info("데이터 서버와 통신 종료");
        return response;
    }
}
