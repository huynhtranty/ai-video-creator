package com.hcmus.softdes.aivideocreator.infrastructure.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.converter.ByteArrayHttpMessageConverter;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.http.converter.StringHttpMessageConverter;
import org.springframework.web.client.RestTemplate;

import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;

@Configuration
public class RestTemplateConfig {

    @Bean
    public RestTemplate restTemplate() {
        RestTemplate restTemplate = new RestTemplate();

        // Thêm UTF-8 message converter
        List<HttpMessageConverter<?>> messageConverters = new ArrayList<>();

        // String converter với UTF-8
        StringHttpMessageConverter stringConverter = new StringHttpMessageConverter(StandardCharsets.UTF_8);
        stringConverter.setWriteAcceptCharset(false); // Tránh thêm charset vào Accept-Charset header
        messageConverters.add(stringConverter);

        // Byte array converter
        messageConverters.add(new ByteArrayHttpMessageConverter());

        restTemplate.setMessageConverters(messageConverters);

        return restTemplate;
    }
}