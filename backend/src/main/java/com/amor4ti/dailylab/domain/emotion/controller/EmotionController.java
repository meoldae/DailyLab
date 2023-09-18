package com.amor4ti.dailylab.domain.emotion.controller;

import com.amor4ti.dailylab.domain.emotion.dto.request.RegisterMemberEmotionDto;
import com.amor4ti.dailylab.domain.emotion.service.EmotionService;
import com.amor4ti.dailylab.domain.emotion.entity.Emotion;
import com.amor4ti.dailylab.global.response.CommonResponse;
import com.amor4ti.dailylab.global.response.DataResponse;
import com.amor4ti.dailylab.global.response.ResponseService;
import com.amor4ti.dailylab.global.response.ResponseStatus;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@Slf4j
@RestController
@RequestMapping("/emotion")
@RequiredArgsConstructor
public class EmotionController {

    private final ResponseService responseService;
    private final EmotionService emotionService;

    @GetMapping
    private DataResponse findAllEmotion() {
        List<Emotion> result = emotionService.getAllEmotion();
        log.info("result={}", result);
        return responseService.successDataResponse(ResponseStatus.REQUEST_SUCCESS, result);
    }

    @PostMapping
    private CommonResponse registerEmotion(Authentication authentication,
                                           @RequestBody RegisterMemberEmotionDto requestDto) {
        emotionService.registerEmotion(requestDto);
        return responseService.successResponse(ResponseStatus.REQUEST_SUCCESS);
    }

    @GetMapping("/date")
    private DataResponse findDayEmotion(Authentication authentication,
                                        @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") Date date) {

//        emotionService.getDayEmotion(date);
    }

}
