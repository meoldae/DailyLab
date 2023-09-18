package com.amor4ti.dailylab.domain.emotion.controller;

import com.amor4ti.dailylab.domain.emotion.service.EmotionService;
import com.amor4ti.dailylab.domain.emotion.service.EmotionServiceImpl;
import com.amor4ti.dailylab.domain.entity.Emotion;
import com.amor4ti.dailylab.global.response.DataResponse;
import com.amor4ti.dailylab.global.response.ResponseService;
import com.amor4ti.dailylab.global.response.ResponseStatus;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/emotion")
@RequiredArgsConstructor
public class EmotionController {

    private final ResponseService responseService;
    private final EmotionService emotionService;

    @GetMapping
    private DataResponse findAllEmotion() {
        List<Emotion> result = emotionService.getAllEmotion();
        return responseService.successDataResponse(ResponseStatus.REQUEST_SUCCESS, result);
    }

}
