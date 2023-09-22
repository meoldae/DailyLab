package com.amor4ti.dailylab.domain.entity.category;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Embeddable;
import java.io.Serializable;

@Getter
@NoArgsConstructor
@Embeddable
public class MemberCategoryId implements Serializable {
    private Long memberId;
    private Long categoryId;

    @Builder
    public MemberCategoryId(Long memberId, Long categoryId) {
        this.memberId = memberId;
        this.categoryId = categoryId;
    }
}
