package com.amor4ti.dailylab.domain.entity.category;

import com.amor4ti.dailylab.domain.entity.Member;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.EmbeddedId;
import javax.persistence.Entity;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class CategoryWhiteList {
    @EmbeddedId
    private MemberCategoryId id;

    @Builder
    public CategoryWhiteList(MemberCategoryId id) {
        this.id = id;
    }
}
