package com.amor4ti.dailylab.global.util;


import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

import java.time.LocalDate;

@Component
public class LocalDateConverter implements Converter<String, LocalDate> {

    @Override
    public LocalDate convert(String source) {

        // 문자열을 LocalDate로 변환
        return LocalDate.parse(source);
    }
}
