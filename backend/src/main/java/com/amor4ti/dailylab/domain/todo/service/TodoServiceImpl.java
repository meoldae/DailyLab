package com.amor4ti.dailylab.domain.todo.service;

import com.amor4ti.dailylab.domain.category.repository.CategoryRepository;
import com.amor4ti.dailylab.domain.categoryBlackList.repository.CategoryBlackListRepository;
import com.amor4ti.dailylab.domain.categoryWhiteList.repository.CategoryWhiteListRepository;
import com.amor4ti.dailylab.domain.categoryWhiteList.service.CategoryWhiteListService;
import com.amor4ti.dailylab.domain.entity.Member;
import com.amor4ti.dailylab.domain.entity.Todo;
import com.amor4ti.dailylab.domain.entity.category.Category;
import com.amor4ti.dailylab.domain.entity.category.CategoryBlackList;
import com.amor4ti.dailylab.domain.entity.category.CategoryWhiteList;
import com.amor4ti.dailylab.domain.entity.category.MemberCategoryId;
import com.amor4ti.dailylab.domain.member.repository.MemberRepository;
import com.amor4ti.dailylab.domain.todo.dto.request.TodoCheckUpdateDto;
import com.amor4ti.dailylab.domain.todo.dto.request.TodoCommunicateDto;
import com.amor4ti.dailylab.domain.todo.dto.request.TodoContentAndCategoryUpdateDto;
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
import com.amor4ti.dailylab.global.util.WebClientUtil;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.retry.annotation.Backoff;
import org.springframework.retry.annotation.Retryable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

import java.time.Duration;
import java.time.Instant;
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
    private final CategoryWhiteListRepository categoryWhiteListRepository;

    private final ResponseService responseService;
    private final TodoReportService todoReportService;
    private final CategoryWhiteListService categoryWhiteListService;

    private final JsonConverter jsonConverter;
    private final WebClientUtil webClientUtil;

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
                    .orElseThrow(() -> {
                        System.out.println("22222");
                        return new CustomException(ExceptionStatus.CATEGORY_NOT_FOUND);
                    });

            TodoDto todoDto = new TodoDto().toDto(todo, category);

            todoDtoList.add(todoDto);
        }

        return responseService.successDataResponse(ResponseStatus.RESPONSE_SUCCESS, todoDtoList);
    }

    @Override
    @Retryable(
            maxAttempts = 3,
            backoff = @Backoff(delay = 100L)
    )
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

        // 이미 블랙리스트에 있을 때
        if(blackListOptional.isPresent() && !blackListOptional.get().isRemove()) {
            // 사용자 등록 시도라면 => blackList 취소
            if(!todoRegistDto.isSystem())
                blackListOptional.get().cancelBlack();
            // 추천 todo 등록 시도라면 => blackList에 걸려버림.
            else
                return null;
        }

        // 화이트 리스트 등록
        Optional<CategoryWhiteList> whiteListOptional = categoryWhiteListRepository.findByMemberCategoryId(memberCategoryId);

        if(whiteListOptional.isEmpty())
            categoryWhiteListService.regist(todoRegistDto.getCategoryId(), memberId);

        Todo todo = todoRegistDto.toEntity(member, category);

        boolean check = todo.getCheckedDate() != null;

        todoRepository.save(todo);

        TodoDto todoDto = TodoDto.builder()
                .todoId(todo.getTodoId())
                .todoDate(todo.getTodoDate())
                .checkedDate(todo.getCheckedDate())
                .categoryId(todo.getCategory().getCategoryId())
                .large(todo.getCategory().getLarge())
                .medium(todo.getCategory().getMedium())
                .small(todo.getCategory().getSmall())
                .content(todo.getContent())
                .check(check)
                .isDeleted(todo.isDeleted())
                .isSystem(todo.isSystem())
                .memberId(memberId)
                .username(member.getUsername())
                .build();

        return responseService.successDataResponse(ResponseStatus.TODO_REGIST_SUCCESS, todoDto);
    }

    @Override
    @Transactional
    public CommonResponse deleteTodo(Long memberId, Long todoId) {

        Todo todo = todoRepository.findByTodoId(todoId)
                .orElseThrow(() -> new CustomException(ExceptionStatus.TODO_NOT_FOUND));

        todo.deleteTodo();

        return responseService.successResponse(ResponseStatus.RESPONSE_SUCCESS);
    }

    @Override
    @Transactional
    public CommonResponse changeCheckTodo(Long memberId, TodoCheckUpdateDto todoCheckUpdateDto) {
        Todo todo = todoRepository.findByTodoId(todoCheckUpdateDto.getTodoId())
                .orElseThrow(() -> new CustomException(ExceptionStatus.TODO_NOT_FOUND));

        todo.checkTodo(todoCheckUpdateDto.getCheckedDate());

        return responseService.successResponse(ResponseStatus.RESPONSE_SUCCESS);
    }

    @Override
    @Retryable(
            maxAttempts = 3,
            backoff = @Backoff(delay = 100L)
    )
    @Transactional
    public void recommendTodo(Long memberId, String todoDate) {
        // FastAPI와 통신
        String fastApiUrl = DATA_SERVER_URL + "/todo";

        TodoCommunicateDto todoCommunicateDto = TodoCommunicateDto.builder()
                                                                  .memberId(memberId)
                                                                  .todoDate(todoDate)
                                                                  .build();

        webClientUtil.post(fastApiUrl, todoCommunicateDto, String.class)
                .subscribe(response -> {
                    // String -> JSON
                    JsonObject jsonObject = new JsonParser().parse(response).getAsJsonObject();

                    List<Long> categoryIdList = new ArrayList<>();
                    List<Double> scoreList = new ArrayList<>();

                    for (Map.Entry<String, JsonElement> entry : jsonObject.entrySet()) {
                        // 카테고리 ID (랭킹)
                        categoryIdList.add(Long.parseLong(entry.getKey()) + 1);

                        // 점수 (랭킹)
                        scoreList.add(entry.getValue().getAsDouble());
                    }

                    int cnt = 0;

                    for (Long categoryId : categoryIdList) {
                        // 일단 6개만
                        if(cnt == 6)
                            break;

                        if(categoryId == 0)
                            continue;

                        Category category = categoryRepository.findByCategoryId(categoryId)
                                .orElseThrow(() -> new CustomException(ExceptionStatus.CATEGORY_NOT_FOUND));

                        // db에 추천 db 등록 로직
                        TodoRegistDto todoRegistDto = TodoRegistDto.builder()
                                                                   .categoryId(categoryId)
                                                                   .content(category.getSmall())
                                                                   .todoDate(LocalDate.parse(todoDate))
                                                                   .isSystem(true)
                                                                   .build();

                        if (registTodo(todoRegistDto, memberId) != null) {
                            cnt++;
                        }
                    }
                }, error -> {
                    new CustomException(ExceptionStatus.FASTAPI_CONNECTION_FAIL);
                });
    }

    @Override
    @Transactional
    public DataResponse changeTodoContentAndCategory(TodoContentAndCategoryUpdateDto todoContentAndCategoryUpdateDto, Long memberId) {
        Todo todo = todoRepository.findByTodoId(todoContentAndCategoryUpdateDto.getTodoId())
                .orElseThrow(() -> new CustomException(ExceptionStatus.TODO_NOT_FOUND));

        if(!Objects.equals(todo.getMember().getMemberId(), memberId))
            throw new CustomException(ExceptionStatus.TODO_UPDATE_REQUEST_BY_OTHER_USER);

        Category category = categoryRepository.findByCategoryId(todoContentAndCategoryUpdateDto.getCategoryId())
                .orElseThrow(() -> new CustomException(ExceptionStatus.CATEGORY_NOT_FOUND));

        todo.changeContentAndCategory(todoContentAndCategoryUpdateDto.getContent(), category);
        // 강제 적용
        todoRepository.save(todo);

        boolean check = todo.getCheckedDate() != null;
        Member member = memberRepository.findMemberByMemberId(memberId)
                .orElseThrow(() -> new CustomException(ExceptionStatus.MEMBER_NOT_FOUND));

        TodoDto todoDto = TodoDto.builder()
                .todoId(todo.getTodoId())
                .todoDate(todo.getTodoDate())
                .checkedDate(todo.getCheckedDate())
                .categoryId(todo.getCategory().getCategoryId())
                .large(todo.getCategory().getLarge())
                .medium(todo.getCategory().getMedium())
                .small(todo.getCategory().getSmall())
                .content(todo.getContent())
                .check(check)
                .isDeleted(todo.isDeleted())
                .isSystem(todo.isSystem())
                .memberId(memberId)
                .username(member.getUsername())
                .build();

        return responseService.successDataResponse(ResponseStatus.RESPONSE_SUCCESS, todoDto);
    }

    /*
     * FastAPI Data Server Communication Logic
     * */
    private String communicateWithFastAPI(Long memberId, String todoDate) {
        log.info("데이터 서버와 통신 시작");

        String fastApiUrl = DATA_SERVER_URL + "/todo";

        TodoCommunicateDto todoCommunicateDto = TodoCommunicateDto.builder()
                .memberId(memberId)
                .todoDate(todoDate)
                .build();

        return webClientUtil.post(fastApiUrl, todoCommunicateDto, String.class)
                .doOnNext(response -> {
                    log.info("FastAPI와 통신 성공!");
                    log.info(response);
                    log.info("데이터 서버와 통신 종료");
                })
                .doOnError(error -> new CustomException(ExceptionStatus.FASTAPI_CONNECTION_FAIL))
                .block();
    }

    /*
     * BlackList Check Logic
     * True : BlackList에 존재 -> 추천 거름
     * False : BlackList에 존재 X -> 테스트 통과
     * */
    private boolean checkBlackList(MemberCategoryId memberCategoryId) {
        Optional<CategoryBlackList> optionalBlackList = categoryBlackListRepository.findByMemberCategoryId(memberCategoryId);

        return optionalBlackList.isPresent() && !optionalBlackList.get().isRemove();
    }

    /*
     * Recommendation Fit(추천 적합도) Check & WhiteList Check
     * True : 추천 적합도가 0이고 WhiteList에 없는 경우 -> 추천 거름
     * False : 추천 적합도가 1이거나 WhiteList에 존재하는 경우 -> 테스트 통과
     * */
    private Boolean checkRecommendationFitAndWhiteList(MemberCategoryId memberCategoryId, Category category) {
        Optional<CategoryWhiteList> optionalWhiteList = categoryWhiteListRepository.findByMemberCategoryId(memberCategoryId);

        return category.getRecommendationFit() == 0 && optionalWhiteList.isEmpty();
    }
}
