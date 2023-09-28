package com.amor4ti.dailylab.domain.diary.controller;

import com.amor4ti.dailylab.domain.diary.dto.response.ResponseDiaryDto;
import com.amor4ti.dailylab.domain.diary.service.DiaryService;
import com.amor4ti.dailylab.domain.member.service.MemberService;
import com.amor4ti.dailylab.domain.todoReport.service.TodoReportService;
import com.amor4ti.dailylab.global.response.CommonResponse;
import com.amor4ti.dailylab.global.response.DataResponse;
import com.amor4ti.dailylab.global.response.ResponseService;
import com.amor4ti.dailylab.global.response.ResponseStatus;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;

@Slf4j
@RestController
@RequestMapping("/diary")
@RequiredArgsConstructor
public class DiaryController {

    private final DiaryService diaryService;
    private final MemberService memberService;
    private final TodoReportService todoReportService;
    private final ResponseService responseService;

    @PostMapping("/predict")
    public CommonResponse createPredictDiary(Authentication authentication,
                                             @RequestParam("date") LocalDate date) {

        Long memberId = Long.parseLong(authentication.getName());

        diaryService.createDefaultDiary(memberId, date);
        memberService.updateStatusProceed(memberId, date);

        return responseService.successResponse(ResponseStatus.CREATE_PREDICT_DIARY);
    }

    @PostMapping("/confirm")
    public CommonResponse createConfirmDiary(Authentication authentication,
                                             @RequestParam("date") LocalDate date) {

        Long memberId = Long.parseLong(authentication.getName());

        todoReportService.finishToday(memberId, date); // 할 일 청산
        memberService.updateStatusWait(memberId, date);
        diaryService.createConfirmDiary(memberId, date);

        return responseService.successResponse(ResponseStatus.CREATE_CONFIRM_DIARY);
    }

    @GetMapping("/predict/{date}")
    public DataResponse findDiaryOnToday(Authentication authentication,
                                        @PathVariable("date") LocalDate date) {
        Long memberId = Long.parseLong(authentication.getName());
        ResponseDiaryDto response = diaryService.getDiaryOnToday(memberId, date);

        return responseService.successDataResponse(ResponseStatus.RESPONSE_SUCCESS, response);
    }

    @GetMapping("/confirm/{date}")
    public DataResponse findDiaryOnDate(Authentication authentication,
                                         @PathVariable("date") LocalDate date) {
        Long memberId = Long.parseLong(authentication.getName());
        ResponseDiaryDto response = diaryService.getDiaryOnDate(memberId, date);

        return responseService.successDataResponse(ResponseStatus.RESPONSE_SUCCESS, response);
    }
}
