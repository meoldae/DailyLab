package com.amor4ti.dailylab.domain.emotion.controller;

import com.amor4ti.dailylab.domain.emotion.dto.request.RegisterMemberEmotionDto;
import com.amor4ti.dailylab.domain.emotion.service.EmotionService;
import com.amor4ti.dailylab.domain.emotion.entity.Emotion;
import com.amor4ti.dailylab.domain.entity.Member;
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
        log.info("OK");
        List<Emotion> result = emotionService.getAllEmotion();

        return responseService.successDataResponse(ResponseStatus.RESPONSE_SUCCESS, result);
    }

    @PostMapping
    private CommonResponse registerEmotion(Authentication authentication,
                                           @RequestBody RegisterMemberEmotionDto requestDto) {

        log.info("Controller OK");
        String memberId = authentication.getName();
        log.info("memberId={}", memberId);
//        emotionService.registerEmotion(memberId, requestDto);

        return responseService.successResponse(ResponseStatus.RESPONSE_SUCCESS);
    }

//    @GetMapping("/date")
//    private DataResponse findDayEmotion(Authentication authentication,
//                                        @RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") Date date) {
//
//        emotionService.getDayEmotion(date);
//    }

}
