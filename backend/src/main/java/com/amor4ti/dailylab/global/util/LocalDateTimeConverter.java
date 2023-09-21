package com.amor4ti.dailylab.global.util;

import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
public class LocalDateTimeConverter implements Converter<String, LocalDateTime> {

    @Override
    public LocalDateTime convert(String source) {

        // 문자열을 LocalDate로 변환
        return LocalDateTime.parse(source);
    }
}
