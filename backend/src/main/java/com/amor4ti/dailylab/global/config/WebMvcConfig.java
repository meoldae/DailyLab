package com.amor4ti.dailylab.global.config;

import com.amor4ti.dailylab.global.util.LocalDateConverter;
import org.springframework.context.annotation.Configuration;
import org.springframework.format.FormatterRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebMvcConfig implements WebMvcConfigurer {

    @Override
    public void addFormatters(FormatterRegistry registry) {

        // LocalDateConverter 등록
        registry.addConverter(new LocalDateConverter());
    }
}
