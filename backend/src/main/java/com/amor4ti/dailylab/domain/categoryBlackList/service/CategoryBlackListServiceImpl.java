package com.amor4ti.dailylab.domain.categoryBlackList.service;

import com.amor4ti.dailylab.domain.category.repository.CategoryRepository;
import com.amor4ti.dailylab.domain.category.service.CategoryService;
import com.amor4ti.dailylab.domain.categoryBlackList.dto.request.CategoryBlackListRegistDto;
import com.amor4ti.dailylab.domain.categoryBlackList.repository.CategoryBlackListRepository;
import com.amor4ti.dailylab.domain.entity.Todo;
import com.amor4ti.dailylab.domain.entity.category.Category;
import com.amor4ti.dailylab.domain.entity.category.CategoryBlackList;
import com.amor4ti.dailylab.domain.entity.category.MemberCategoryId;
import com.amor4ti.dailylab.domain.todo.dto.request.TodoUpdateDto;
import com.amor4ti.dailylab.domain.todo.repository.TodoRepository;
import com.amor4ti.dailylab.domain.todo.service.TodoService;
import com.amor4ti.dailylab.global.exception.CustomException;
import com.amor4ti.dailylab.global.exception.ExceptionStatus;
import com.amor4ti.dailylab.global.response.CommonResponse;
import com.amor4ti.dailylab.global.response.DataResponse;
import com.amor4ti.dailylab.global.response.ResponseService;
import com.amor4ti.dailylab.global.response.ResponseStatus;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;

@Service
@Slf4j
@RequiredArgsConstructor
public class CategoryBlackListServiceImpl implements CategoryBlackListService {

    private final ResponseService responseService;
    private final TodoService todoService;

    private final CategoryBlackListRepository categoryBlackListRepository;
    private final TodoRepository todoRepository;
    private final CategoryRepository categoryRepository;

    @Override
    public CommonResponse black(Long todoId, Long memberId) {
        // todo삭제
        todoService.deleteTodo(memberId, todoId);

        Todo todo = todoRepository.findByTodoId(todoId)
                .orElseThrow(() -> new CustomException(ExceptionStatus.TODO_NOT_FOUND));

        // 복합키
        MemberCategoryId memberCategoryId = MemberCategoryId.builder()
                .memberId(memberId)
                .categoryId(todo.getCategory().getCategoryId())
                .build();

        Optional<CategoryBlackList> byMemberCategoryId = categoryBlackListRepository.findByMemberCategoryId(memberCategoryId);

        // 이미 블랙리스트에 해당 Row가 존재한다면
        if(byMemberCategoryId.isPresent()) {
            // 이전에 블랙리스트에서 해방시킨 적이 있다면
            if(byMemberCategoryId.get().isRemove()) {
                byMemberCategoryId.get().reBlack();

                // 등록
                categoryBlackListRepository.save(byMemberCategoryId.get());
            }
            else
                throw new CustomException(ExceptionStatus.CATEGORY_BLACKLIST_ALREADY_TRUE);
        }
        else {
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

        if(categoryBlackList.isRemove())
            throw new CustomException(ExceptionStatus.CATEGORY_BLACKLIST_ALREADY_FALSE);
        else {
            categoryBlackList.cancelBlack();
            categoryBlackListRepository.save(categoryBlackList);

            return responseService.successResponse(ResponseStatus.RESPONSE_SUCCESS);
        }
    }

    @Override
    public DataResponse getBlacklist(Long memberId) {
        List<CategoryBlackList> list = categoryBlackListRepository.findAllById_MemberIdAndIsRemove(memberId, false);
        List<Category> result = new LinkedList<>();

        for(CategoryBlackList cbl : list){
            Category category = categoryRepository.findByCategoryId(cbl.getId().getCategoryId())
                    .orElseThrow(() -> new CustomException(ExceptionStatus.CATEGORY_NOT_FOUND));
            result.add(category);
        }
        return responseService.successDataResponse(ResponseStatus.RESPONSE_SUCCESS, result);
    }
}
