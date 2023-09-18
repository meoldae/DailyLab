package com.amor4ti.dailylab.domain.entity.category;

import javax.persistence.Embeddable;
import java.io.Serializable;

@Embeddable
public class MemberCategoryId implements Serializable {
    private Long memberId;
    private Long categoryId;
}
