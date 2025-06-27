package com.hcmus.softdes.aivideocreator.infrastructure.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

@Configuration
public class AzureSpeechConfig {

    @Value("${azure.speech.key}")
    private String subscriptionKey;

    @Value("${azure.speech.region}")
    private String region;

    public String getSubscriptionKey() {
        return subscriptionKey;
    }

    public String getRegion() {
        return region;
    }
}