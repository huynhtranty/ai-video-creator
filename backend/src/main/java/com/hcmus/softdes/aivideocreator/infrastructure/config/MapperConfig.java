package com.hcmus.softdes.aivideocreator.infrastructure.config;

import com.hcmus.softdes.aivideocreator.infrastructure.mapper.UserMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class MapperConfig {

    @Bean
    public UserMapper userMapper() {
        return org.mapstruct.factory.Mappers.getMapper(UserMapper.class);
    }
}