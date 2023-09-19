package com.amor4ti.dailylab.domain.entity.category;

import com.amor4ti.dailylab.domain.entity.Member;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class CategoryBlackList {
    @EmbeddedId
    private MemberCategoryId id;

    private boolean isRemove;

    @Builder
    public CategoryBlackList(MemberCategoryId id, boolean isRemove) {
        this.id = id;
        this.isRemove = isRemove;
    }
}
