package com.amor4ti.dailylab.domain.categoryWhiteList.repository;

import com.amor4ti.dailylab.domain.categoryWhiteList.dto.response.CategoryWhiteListDto;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CategoryWhiteListCustomRepository {

    List<CategoryWhiteListDto> findCategoryWhiteListByMemberId(@Param("memberId") Long memberId);
}
