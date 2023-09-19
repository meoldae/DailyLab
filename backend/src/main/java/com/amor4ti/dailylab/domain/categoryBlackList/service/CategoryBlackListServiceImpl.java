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

        // 이미 블랙리스트에 해당 Row가 존재한다면
        if(byMemberCategoryId.isPresent()) {
            // 이전에 블랙리스트에서 해방시킨 적이 있다면
            if(byMemberCategoryId.get().isRemove()) {
                System.out.println("reblack33333333333333333333333333333333333");
                byMemberCategoryId.get().reBlack();

                // 등록
                categoryBlackListRepository.save(byMemberCategoryId.get());
            }
            else {
                System.out.println("exception4444444444444444444");
                throw new CustomException(ExceptionStatus.CATEGORY_BLACKLIST_ALREADY_TRUE);
            }
        }
        else {
            System.out.println("regist222222222");
            CategoryBlackList categoryBlackList = CategoryBlackList.builder()
                    .id(memberCategoryId)
                    .isRemove(false)
                    .build();

            // 등록
            categoryBlackListRepository.save(categoryBlackList);

        }
        return responseService.successResponse(ResponseStatus.RESPONSE_SUCCESS);
    }

    @Override
    public CommonResponse cancelBlack(Long categoryId, Long memberId) {
        // 복합키
        MemberCategoryId memberCategoryId = MemberCategoryId.builder()
                .memberId(memberId)
                .categoryId(categoryId)
                .build();

        CategoryBlackList categoryBlackList = categoryBlackListRepository.findByMemberCategoryId(memberCategoryId)
                .orElseThrow(() -> new CustomException(ExceptionStatus.CATEGORY_BLACKLIST_NOT_FOUND));

        if(categoryBlackList.isRemove()) {
            System.out.println("이미 isRemove가 true인데요 !!!");
            throw new CustomException(ExceptionStatus.CATEGORY_BLACKLIST_ALREADY_FALSE);
        }
        else {
            categoryBlackList.cancelBlack();
            categoryBlackListRepository.save(categoryBlackList);

            return responseService.successResponse(ResponseStatus.RESPONSE_SUCCESS);
        }
    }
}
