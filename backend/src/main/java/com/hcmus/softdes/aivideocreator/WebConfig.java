package com.hcmus.softdes.aivideocreator;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // This ensures that URLs starting with /images/ are served from the static/images directory
        registry.addResourceHandler("/images/**")
                .addResourceLocations("classpath:/static/images/");
    }
}
