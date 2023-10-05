package com.amor4ti.dailylab.global.config;

import io.netty.channel.ChannelOption;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.client.reactive.ReactorClientHttpConnector;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.util.DefaultUriBuilderFactory;
import reactor.netty.resources.ConnectionProvider;

import reactor.netty.http.client.HttpClient;
import java.time.Duration;

@Configuration
public class WebClientConfig {

    private final DefaultUriBuilderFactory factory = new DefaultUriBuilderFactory();

    private final HttpClient httpClient = HttpClient.create(
                    ConnectionProvider.builder("http-pool")
                                      .maxConnections(100)
                                      .pendingAcquireTimeout(Duration.ofMillis(0))
                                      .pendingAcquireMaxCount(-1)
                                      .maxIdleTime(Duration.ofMillis(1000L))
                                      .build())

                    .option(ChannelOption.CONNECT_TIMEOUT_MILLIS, 100000) // 100초
                    .responseTimeout(Duration.ofSeconds(100)); // 100초 응답 타임아웃

    @Bean
    public WebClient webClient() {
        factory.setEncodingMode(DefaultUriBuilderFactory.EncodingMode.VALUES_ONLY);
        return WebClient.builder()
                .uriBuilderFactory(factory)
                .codecs(configurer -> configurer.defaultCodecs().maxInMemorySize(50 * 1024 * 1024))
                .clientConnector(new ReactorClientHttpConnector(httpClient))
                .build();
    }
}
