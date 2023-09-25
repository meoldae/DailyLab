package com.amor4ti.dailylab.domain.categoryWhiteList.repository;

import com.amor4ti.dailylab.domain.categoryWhiteList.dto.response.CategoryWhiteListDto;
import com.amor4ti.dailylab.domain.categoryWhiteList.dto.response.QCategoryWhiteListDto;
import com.amor4ti.dailylab.domain.entity.category.QCategory;
import com.amor4ti.dailylab.domain.entity.category.QCategoryWhiteList;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;

import javax.persistence.EntityManager;
import java.util.List;

import static com.amor4ti.dailylab.domain.entity.category.QCategory.category;
import static com.amor4ti.dailylab.domain.entity.category.QCategoryWhiteList.categoryWhiteList;

public class CategoryWhiteListCustomRepositoryImpl implements CategoryWhiteListCustomRepository {

    private final JPAQueryFactory jpaQueryFactory;

    public CategoryWhiteListCustomRepositoryImpl(EntityManager em) {
        this.jpaQueryFactory = new JPAQueryFactory(em);
    }

    @Override
    public List<CategoryWhiteListDto> findCategoryWhiteListByMemberId(Long memberId) {
        return jpaQueryFactory
                .select(new QCategoryWhiteListDto(
                        categoryWhiteList.id.memberId,
                        categoryWhiteList.id.categoryId,
                        category.large,
                        category.medium,
                        category.small
                ))
                .from(categoryWhiteList)
                .join(category)
                .on(categoryWhiteList.id.categoryId.eq(category.categoryId))
                .where(memberIdEquals(memberId))
                .fetch();
    }

    /*
    * where문에 사용될 공통 코드
    * */

    private BooleanExpression memberIdEquals(Long memberId) {

        return categoryWhiteList.id.memberId.eq(memberId);
    }
}
