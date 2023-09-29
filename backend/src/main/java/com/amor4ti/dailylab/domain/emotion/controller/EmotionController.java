package com.amor4ti.dailylab.domain.emotion.controller;

import com.amor4ti.dailylab.domain.emotion.dto.request.RegisterMemberEmotionDto;
import com.amor4ti.dailylab.domain.emotion.dto.response.EmotionAggregateCount;
import com.amor4ti.dailylab.domain.emotion.dto.response.MemberEmotionDayDto;
import com.amor4ti.dailylab.domain.emotion.dto.response.MemberEmotionPeriodDto;
import com.amor4ti.dailylab.domain.emotion.dto.response.ResponseEmotionAggregate;
import com.amor4ti.dailylab.domain.emotion.service.EmotionService;
import com.amor4ti.dailylab.domain.emotion.entity.Emotion;
import com.amor4ti.dailylab.global.rabbitmq.MessagePublisher;
import com.amor4ti.dailylab.global.response.CommonResponse;
import com.amor4ti.dailylab.global.response.DataResponse;
import com.amor4ti.dailylab.global.response.ResponseService;
import com.amor4ti.dailylab.global.response.ResponseStatus;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Slf4j
@RestController
@RequestMapping("/emotion")
@RequiredArgsConstructor
public class EmotionController {

    private final ResponseService responseService;
    private final EmotionService emotionService;
    private final MessagePublisher messagePublisher;

    @GetMapping
    private DataResponse findAllEmotion() {
        List<Emotion> result = emotionService.getAllEmotion();

        return responseService.successDataResponse(ResponseStatus.RESPONSE_SUCCESS, result);
    }

    @PostMapping
    private CommonResponse registerEmotion(Authentication authentication,
                                           @RequestBody RegisterMemberEmotionDto requestDto) {

        Long memberId = Long.parseLong(authentication.getName());
        requestDto.setMemberId(memberId);
        messagePublisher.sendToQueue(requestDto);

        return responseService.successResponse(ResponseStatus.REGISTER_EMOTION_SUCCESS);
    }

    @GetMapping("/date")
    private DataResponse findDayEmotion(Authentication authentication,
                                        @RequestParam String date) {
        Long memberId = Long.parseLong(authentication.getName());
        List<MemberEmotionDayDto> result = emotionService.getDayEmotion(memberId, date);

        return responseService.successDataResponse(ResponseStatus.RESPONSE_SUCCESS, result);
    }

    @GetMapping("/period")
    private DataResponse findPeriodEmotion(Authentication authentication,
                                           @RequestParam("startdate") String startDate,
                                           @RequestParam("enddate") String endDate) {

        Long memberId = Long.parseLong(authentication.getName());
        List<MemberEmotionPeriodDto> result = emotionService.getEmotionsBetweenDates(memberId, startDate, endDate);
        return responseService.successDataResponse(ResponseStatus.RESPONSE_SUCCESS, result);
    }

    @GetMapping("/aggregate")
    private DataResponse findAggregateEmotion(Authentication authentication,
                                              @RequestParam(value = "state") String state,
                                              @RequestParam("startdate") LocalDate startDate,
                                              @RequestParam("enddate") LocalDate endDate) {
        Long memberId = Long.parseLong(authentication.getName());
        List<ResponseEmotionAggregate> result = new ArrayList<>();
        if ("ageGender".equals(state)) {
            result = emotionService.getEmotionsAggregate(memberId, startDate, endDate);
        } else if ("total".equals(state)) {
            result = emotionService.getEmotionsTotalAggregate(memberId, startDate, endDate);
        }
        return responseService.successDataResponse(ResponseStatus.RESPONSE_SUCCESS, result);
    }

    @PostMapping("/test")
    private CommonResponse test(@RequestParam("date") String date) {
        emotionService.updateEmotionsAggregate(date);
        return responseService.successResponse(ResponseStatus.RESPONSE_SUCCESS);
    }
}
