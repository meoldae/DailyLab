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
                .orElseThrow(() -> {
                    return new CustomException(ExceptionStatus.CATEGORY_NOT_FOUND);
                });

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
                throw new CustomException(ExceptionStatus.CATEGORY_BLACKLIST_ALREADY_FALSE);
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

        DataResponse<?> dataResponse = responseService.successDataResponse(ResponseStatus.TODO_REGIST_SUCCESS, todoDto);

        return dataResponse;
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
    public DataResponse recommendTodo(Long memberId, String todoDate) {
        // 코드 실행 시작 시간 기록
        Instant startTime = Instant.now();

        log.info("todo 추천 로직 시작");

        // 우선 하루 마무리
        // 마무리는 언제 추천 요청을 하든 간에 추천 todo 수행일 -1에 실행된다.
//         todoReportService.finishToday(memberId, LocalDate.parse(todoDate).minusDays(1));

        // FastAPI와 통신
        String response = communicateWithFastAPI(memberId, todoDate);

        // String -> JSON
//        JsonObject jsonObject = jsonConverter.converter(response);
        JsonObject jsonObject = new JsonParser().parse(response).getAsJsonObject();

        List<Long> CategoryIdList = new ArrayList<>();
        List<Double> ScoreList = new ArrayList<>();

        for (Map.Entry<String, JsonElement> entry : jsonObject.entrySet()) {
            // 카테고리 ID (랭킹)
            CategoryIdList.add(Long.parseLong(entry.getKey()) + 1);

            // 점수 (랭킹)
            ScoreList.add(entry.getValue().getAsDouble());
        }

        // 빈 추천 Todo 객체
        List<TodoRecommendedDto> todoRecommendedDtoList = new ArrayList<>();

        // 기존에 등록되어 있던 todo 갯수 세기 (기존에 유저가 등록해 뒀던)
        long beforeTodoCnt = todoRepository.countMemberTodoByMemberIdAndTodoDate(memberId, LocalDate.parse(todoDate));

        if(beforeTodoCnt >= 7)
            throw new CustomException(ExceptionStatus.TODO_ALREADY_OVER_SEVEN);

        int cnt = 0;

        for (Long categoryId : CategoryIdList) {
            // 일단 7개만
            if(cnt == 7 - beforeTodoCnt)
                break;

            if(categoryId == 0)
                continue;

            Category category = categoryRepository.findByCategoryId(categoryId)
                    .orElseThrow(() -> new CustomException(ExceptionStatus.CATEGORY_NOT_FOUND));

            // 횟수 증가
            cnt++;

            // db에 추천 db 등록 로직
            TodoRegistDto todoRegistDto = TodoRegistDto.builder()
                    .categoryId(categoryId)
                    .content(category.getSmall())
                    .todoDate(LocalDate.parse(todoDate))
                    .isSystem(true)
                    .build();

            DataResponse dataResponse = registTodo(todoRegistDto, memberId);


            List<Todo> todoList = todoRepository.findByMemberIdAndCategoryIdAndTodoDate(memberId, categoryId, LocalDate.parse(todoDate));

            for (Todo todo : todoList) {
                TodoRecommendedDto todoRecommendedDto = todoRepository.findTodoRecommendedDtoByMemberIdAndTodoId(memberId, todo.getTodoId())
                        .orElseThrow(() -> new CustomException(ExceptionStatus.EXCEPTION));

                todoRecommendedDtoList.add(todoRecommendedDto);
            }
        }

        log.info("추천 todo 개수 : " + todoRecommendedDtoList.size());

        // 코드 실행 종료 시간 기록
        Instant endTime = Instant.now();

        log.info("걸린 시간 : " + (Duration.between(startTime, endTime).toNanos()) / 1_000_000_000.0 + "초");
        log.info("todo 추천 로직 종료");

        return responseService.successDataResponse(ResponseStatus.RESPONSE_SUCCESS, todoRecommendedDtoList);
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
        // fastAPI 요청 주소
//        String fastApiUrl = "http://localhost:8181/todo";
        String fastApiUrl = DATA_SERVER_URL + "/todo";

        // RestTemplate 통신
//        Map<String, Object> data = new HashMap<>();
//        data.put("memberId", memberId);
//        data.put("todoDate", todoDate);
//        RestTemplate restTemplate = new RestTemplate();

        // 통신 결과 (FastAPI에서 반환한 값)
//        String response = restTemplate.postForObject(fastApiUrl, data, String.class);

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


//        log.info("response : " + response);
//        log.info("데이터 서버와 통신 종료");
//        return response;
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
