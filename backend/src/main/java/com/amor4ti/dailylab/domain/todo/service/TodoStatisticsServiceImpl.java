package com.amor4ti.dailylab.domain.todo.service;

import com.amor4ti.dailylab.domain.category.service.CategoryService;
import com.amor4ti.dailylab.domain.entity.Member;
import com.amor4ti.dailylab.domain.member.repository.MemberRepository;
import com.amor4ti.dailylab.domain.member.service.MemberService;
import com.amor4ti.dailylab.domain.todo.dto.response.OtherTodoDto;
import com.amor4ti.dailylab.domain.todo.dto.response.TodoStatisticsDto;
import com.amor4ti.dailylab.domain.todo.mapper.TodoMapper;
import com.amor4ti.dailylab.domain.todo.repository.TodoRepository;
import com.amor4ti.dailylab.global.exception.CustomException;
import com.amor4ti.dailylab.global.exception.ExceptionStatus;
import com.amor4ti.dailylab.global.response.DataResponse;
import com.amor4ti.dailylab.global.response.ResponseService;
import com.amor4ti.dailylab.global.response.ResponseStatus;
import com.amor4ti.dailylab.global.util.WebClientUtil;
import com.querydsl.core.Tuple;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.*;

@Slf4j
@Service
@RequiredArgsConstructor
public class TodoStatisticsServiceImpl implements TodoStatisticsService {

    @Value("${data-server-url}")
    private String DATA_SERVER_URL;
    private final WebClientUtil webClientUtil;
    private final ResponseService responseService;
    private final CategoryService categoryService;
    private final MemberRepository memberRepository;
    private final MemberService memberService;
    private final TodoRepository todoRepository;
    private final TodoMapper todoMapper;

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
    public DataResponse getTodoSummary(Long memberId, String state, LocalDate startDate, LocalDate endDate) {
        List<Long> memberIdList = new LinkedList<>();

        if(!state.equals("all")){
            Member findMember = memberRepository.findById(memberId)
                    .orElseThrow(() -> new CustomException(ExceptionStatus.MEMBER_NOT_FOUND));

            int memberAge = (LocalDate.now().getYear() - findMember.getBirthday().getYear())/10;
            String gender = findMember.getGender();

            if(state.equals("personal")){
                memberIdList.add(findMember.getMemberId());
            }else{
                memberIdList = memberService.getMemberListByGenderAndAge(gender, memberAge);
            }

        }else memberIdList = null;

        Long[] allCount = {0l, 0l, 0l, 0l, 0l, 0l};
        Map<String, Integer> map = new HashMap<>();
        map.put("소통", 0);
        map.put("성장", 1);
        map.put("일상", 2);
        map.put("과업", 3);
        map.put("여가", 4);
        map.put("기타", 5);

        long all = 0l, success = 0l;
        List<Tuple> list = todoRepository.getStatistics(startDate, endDate, memberIdList);


        for(Tuple i : list) {
            long a = i.get(0, Long.class);
            allCount[map.get(i.get(2, String.class))] = a;
            all += a;
            success += i.get(1, Integer.class).longValue();
        }

        double percent = ((double)success/(double)all) * 100.0;
        TodoStatisticsDto todoStatisticsDto = todoMapper.todoToTodoStatisticsDto(allCount, Math.round(percent*100)/100.0);
        return responseService.successDataResponse(ResponseStatus.RESPONSE_SUCCESS, todoStatisticsDto);
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
