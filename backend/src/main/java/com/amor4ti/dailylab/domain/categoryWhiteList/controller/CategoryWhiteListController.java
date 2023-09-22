package com.amor4ti.dailylab.domain.categoryWhiteList.controller;

import com.amor4ti.dailylab.domain.categoryWhiteList.service.CategoryWhiteListService;
import com.amor4ti.dailylab.global.response.CommonResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/category/whitelist")
@RequiredArgsConstructor
public class CategoryWhiteListController {

    private final CategoryWhiteListService categoryWhiteListService;

    @PostMapping("/regist/{categoryId}")
    public CommonResponse regist(@PathVariable Long categoryId, Authentication authentication) {
        Long memberId = Long.parseLong(authentication.getName());

        return categoryWhiteListService.regist(categoryId, memberId);
    }
}
