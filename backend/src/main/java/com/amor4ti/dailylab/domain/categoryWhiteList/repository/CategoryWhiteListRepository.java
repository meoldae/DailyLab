package com.amor4ti.dailylab.domain.categoryWhiteList.repository;

import com.amor4ti.dailylab.domain.entity.category.CategoryWhiteList;
import com.amor4ti.dailylab.domain.entity.category.MemberCategoryId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CategoryWhiteListRepository extends JpaRepository<CategoryWhiteList, Long>,
                                                     CategoryWhiteListCustomRepository,
                                                     QuerydslPredicateExecutor<CategoryWhiteList> {

    @Query("SELECT cwl FROM CategoryWhiteList cwl WHERE cwl.id = :memberCategoryId")
    Optional<CategoryWhiteList> findByMemberCategoryId(@Param("memberCategoryId") MemberCategoryId memberCategoryId);
}
