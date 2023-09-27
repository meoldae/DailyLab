package com.amor4ti.dailylab.domain.todo.service;

import com.amor4ti.dailylab.domain.category.service.CategoryService;
import com.amor4ti.dailylab.domain.member.repository.MemberRepository;
import com.amor4ti.dailylab.domain.todo.dto.response.OtherTodoDto;
import com.amor4ti.dailylab.domain.todo.repository.TodoRepository;
import com.amor4ti.dailylab.global.exception.CustomException;
import com.amor4ti.dailylab.global.exception.ExceptionStatus;
import com.amor4ti.dailylab.global.response.CommonResponse;
import com.amor4ti.dailylab.global.response.DataResponse;
import com.amor4ti.dailylab.global.response.ResponseService;
import com.amor4ti.dailylab.global.response.ResponseStatus;
import com.amor4ti.dailylab.global.util.WebClientUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

import java.util.*;

@Slf4j
@Service
@RequiredArgsConstructor
public class TodoStasticsServiceImpl implements  TodoStasticsService{

    @Value("${data-server-url}")
    private String DATA_SERVER_URL;
    private final WebClientUtil webClientUtil;
    private final ResponseService responseService;
    private final CategoryService categoryService;

    @Override
    public DataResponse getOtherList(Long memberId) {
        String url = "/recommend";

        Map<String, Object> data = new HashMap<>();
        data.put("memberId", memberId);
        data.put("period", 7);

        Map<String, Object> response = connection(data, url);
        List<OtherTodoDto> list = new LinkedList<>();

        Set<String> keySet = response.keySet();

        for(String key : keySet){
            OtherTodoDto otherTodoDto = new OtherTodoDto();
            otherTodoDto.setSmall(categoryService.getCategoryName(Long.parseLong(key)));
            otherTodoDto.setCount((Integer)response.get(key));
            list.add(otherTodoDto);
        }

        return responseService.successDataResponse(ResponseStatus.RESPONSE_SUCCESS, list);
    }

    @Override
    public Map<String, Object> connection(Object data, String url) {

        return webClientUtil.post(DATA_SERVER_URL + url, data, Map.class)
                .doOnNext(response -> {
                    log.info("데이터 서버 연결");
                    log.info("--- success : response {}", response);
                    log.info("--- response type : {}", response.getClass().getName());

                    Set<String> keySet = response.keySet();
                })
                .doOnError(error -> {
                            throw new CustomException(ExceptionStatus.FASTAPI_CONNECTION_FAIL);
                        }
                ).block();
    }
}
