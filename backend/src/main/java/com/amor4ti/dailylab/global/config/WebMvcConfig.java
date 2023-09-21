package com.amor4ti.dailylab.global.config;

import com.amor4ti.dailylab.global.util.LocalDateConverter;
import com.amor4ti.dailylab.global.util.LocalDateTimeConverter;
import org.springframework.context.annotation.Configuration;
import org.springframework.format.FormatterRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebMvcConfig implements WebMvcConfigurer {

    @Override
    public void addFormatters(FormatterRegistry registry) {

        // Converter 등록
        registry.addConverter(new LocalDateConverter());
        registry.addConverter(new LocalDateTimeConverter());
    }
}
