package com.amor4ti.dailylab.domain.category.service;

import com.amor4ti.dailylab.global.response.DataResponse;
import org.springframework.stereotype.Service;

public interface CategoryService {

    public DataResponse getOneCategory(Long categoryId);

    public DataResponse getCategoryList();
}
