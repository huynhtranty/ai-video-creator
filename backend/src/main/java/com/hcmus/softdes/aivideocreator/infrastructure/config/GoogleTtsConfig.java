package com.hcmus.softdes.aivideocreator.infrastructure.config;

import com.google.api.client.util.Value;
import com.google.api.gax.core.FixedCredentialsProvider;
import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.texttospeech.v1.TextToSpeechClient;
import com.google.cloud.texttospeech.v1.TextToSpeechSettings;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.io.FileInputStream;
import java.io.IOException;

@Configuration
public class GoogleTtsConfig {

    @Value("${google.tts.credentialsPath}")
    private String credentialsPath;

    @Bean
    public TextToSpeechClient googleTextToSpeechClient() throws IOException {
        GoogleCredentials credentials = GoogleCredentials.fromStream(new FileInputStream(credentialsPath));
        TextToSpeechSettings settings = TextToSpeechSettings.newBuilder()
                .setCredentialsProvider(FixedCredentialsProvider.create(credentials))
                .build();
        return TextToSpeechClient.create(settings);
    }
}
