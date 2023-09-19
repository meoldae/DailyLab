package com.amor4ti.dailylab.domain.categoryBlackList.controller;

import com.amor4ti.dailylab.domain.categoryBlackList.dto.request.CategoryBlackListRegistDto;
import com.amor4ti.dailylab.domain.categoryBlackList.service.CategoryBlackListService;
import com.amor4ti.dailylab.global.response.CommonResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/category/blacklist")
@RequiredArgsConstructor
public class CategoryBlackListController {

    private final CategoryBlackListService categoryBlackListService;

    @PostMapping("/black")
    public CommonResponse black(@RequestBody CategoryBlackListRegistDto categoryBlackListRegistDto, Authentication authentication) {
        Long memberId = Long.parseLong(authentication.getName());

        return categoryBlackListService.black(categoryBlackListRegistDto, memberId);
    }
}
