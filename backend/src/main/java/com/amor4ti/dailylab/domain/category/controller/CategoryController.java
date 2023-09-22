package com.amor4ti.dailylab.domain.category.controller;

import com.amor4ti.dailylab.domain.category.service.CategoryService;
import com.amor4ti.dailylab.global.response.DataResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/category")
@RequiredArgsConstructor
public class CategoryController {

    private final CategoryService categoryService;

    @GetMapping("/{categoryId}")
    public DataResponse getOneCategory(@PathVariable Long categoryId) {

        return categoryService.getOneCategory(categoryId);
    }

    @GetMapping("/all")
    public DataResponse getCategoryList() {

        return categoryService.getCategoryList();
    }

    @GetMapping("/all/tree")
    public DataResponse getCategoryTreeList() {

        return categoryService.getCategoryTreeList();
    }

}
