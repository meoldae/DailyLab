package com.amor4ti.dailylab.domain.category.repository;

import com.amor4ti.dailylab.domain.entity.category.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {

    @Query("SELECT c FROM Category c WHERE c.categoryId = :categoryId")
    Optional<Category> findByCategoryId(@Param("categoryId") Long categoryId);
}
