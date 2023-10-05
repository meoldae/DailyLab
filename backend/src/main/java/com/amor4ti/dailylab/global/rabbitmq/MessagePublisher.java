package com.amor4ti.dailylab.global.rabbitmq;

import com.amor4ti.dailylab.domain.emotion.dto.request.RegisterMemberEmotionDto;
import com.amor4ti.dailylab.global.config.RabbitMqConfiguration;
import lombok.RequiredArgsConstructor;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MessagePublisher {

    @Value("${rabbitmq.exchange.name}")
    private String exchangeName;

    @Value(("${rabbitmq.routing.key}"))
    private String routingKey;

    private final RabbitTemplate rabbitTemplate;

    public void sendToQueue(RegisterMemberEmotionDto dto) {
        rabbitTemplate.convertAndSend(exchangeName, routingKey, dto);
    }
}
