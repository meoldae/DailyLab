package com.amor4ti.dailylab.domain.diary.controller;

import com.amor4ti.dailylab.domain.diary.service.DiaryService;
import com.amor4ti.dailylab.global.response.CommonResponse;
import com.amor4ti.dailylab.global.response.ResponseService;
import com.amor4ti.dailylab.global.response.ResponseStatus;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;

@Slf4j
@RestController
@RequestMapping("/diary")
@RequiredArgsConstructor
public class DiaryController {

    private final DiaryService diaryService;
    private final ResponseService responseService;

    @PostMapping("/predict")
    public CommonResponse createPredictDiary(Authentication authentication,
                                             @RequestParam("date") LocalDate date) {

        Long memberId = Long.parseLong(authentication.getName());
        diaryService.createDefaultDiary(memberId, date);
        return responseService.successResponse(ResponseStatus.CREATE_PREDICT_DIARY);
    }
}
