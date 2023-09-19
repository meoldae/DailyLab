package com.amor4ti.dailylab.domain.categoryBlackList.service;

import com.amor4ti.dailylab.domain.categoryBlackList.dto.request.CategoryBlackListRegistDto;
import com.amor4ti.dailylab.domain.categoryBlackList.repository.CategoryBlackListRepository;
import com.amor4ti.dailylab.domain.entity.category.CategoryBlackList;
import com.amor4ti.dailylab.domain.entity.category.MemberCategoryId;
import com.amor4ti.dailylab.domain.todo.dto.request.TodoUpdateDto;
import com.amor4ti.dailylab.domain.todo.service.TodoService;
import com.amor4ti.dailylab.global.exception.CustomException;
import com.amor4ti.dailylab.global.exception.ExceptionStatus;
import com.amor4ti.dailylab.global.response.CommonResponse;
import com.amor4ti.dailylab.global.response.ResponseService;
import com.amor4ti.dailylab.global.response.ResponseStatus;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@Slf4j
@RequiredArgsConstructor
public class CategoryBlackListServiceImpl implements CategoryBlackListService {

    private final ResponseService responseService;
    private final TodoService todoService;

    private final CategoryBlackListRepository categoryBlackListRepository;

    @Override
    public CommonResponse black(CategoryBlackListRegistDto categoryBlackListRegistDto, Long memberId) {
        // 블랙리스트 등록 전 먼저 todo 삭제 과정
        TodoUpdateDto todoUpdateDto = TodoUpdateDto.builder()
                .categoryId(categoryBlackListRegistDto.getCategoryId())
                .todoDate(categoryBlackListRegistDto.getTodoDate())
                .build();
        todoService.deleteTodo(memberId, todoUpdateDto);

        // 복합키
        MemberCategoryId memberCategoryId = MemberCategoryId.builder()
                .memberId(memberId)
                .categoryId(categoryBlackListRegistDto.getCategoryId())
                .build();

        Optional<CategoryBlackList> byMemberCategoryId = categoryBlackListRepository.findByMemberCategoryId(memberCategoryId);

        // 이미 블랙리스트에 해당 Row가 존재한다면 중복 에러
        if(byMemberCategoryId.isPresent())
            throw new CustomException(ExceptionStatus.CATEGORY_BLACKLIST_ALREADY_EXISTED);
        else {
            CategoryBlackList categoryBlackList = CategoryBlackList.builder()
                    .id(memberCategoryId)
                    .isRemove(false)
                    .build();

            // 등록
            categoryBlackListRepository.save(categoryBlackList);

            return responseService.successResponse(ResponseStatus.RESPONSE_SUCCESS);
        }
    }
}
