package com.amor4ti.dailylab.domain.categoryBlackList.repository;

import com.amor4ti.dailylab.domain.entity.category.CategoryBlackList;
import com.amor4ti.dailylab.domain.entity.category.MemberCategoryId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CategoryBlackListRepository extends JpaRepository<CategoryBlackList, Long> {

    @Query("SELECT cb FROM CategoryBlackList cb WHERE cb.id = :memberCategoryId")
    Optional<CategoryBlackList> findByMemberCategoryId(@Param("memberCategoryId") MemberCategoryId memberCategoryId);
}
