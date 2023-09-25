package com.amor4ti.dailylab.global.rabbitmq;

import com.amor4ti.dailylab.domain.emotion.dto.request.RegisterMemberEmotionDto;
import com.amor4ti.dailylab.domain.emotion.service.EmotionService;
import lombok.RequiredArgsConstructor;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MessageConsumer {

    private final EmotionService emotionService;

    @RabbitListener(queues = "${rabbitmq.queue.name}")
    public void handleMessage(RegisterMemberEmotionDto registerMemberEmotionDto) {
        emotionService.registerEmotion(registerMemberEmotionDto);
    }
}
