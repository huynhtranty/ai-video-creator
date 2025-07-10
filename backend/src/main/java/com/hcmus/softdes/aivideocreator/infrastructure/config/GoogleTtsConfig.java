package com.hcmus.softdes.aivideocreator.infrastructure.config;

import com.google.api.gax.core.FixedCredentialsProvider;
import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.texttospeech.v1.TextToSpeechClient;
import com.google.cloud.texttospeech.v1.TextToSpeechSettings;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Paths;

@Configuration
public class GoogleTtsConfig {

    @Value("${google.tts.credentialsPath}")
    private String credentialsPath;

    @Bean
    public TextToSpeechClient googleTextToSpeechClient() throws IOException {
        InputStream credentialsStream;
        if (credentialsPath.startsWith("classpath:")) {
            String resourcePath = credentialsPath.substring("classpath:".length());
            credentialsStream = getClass().getClassLoader().getResourceAsStream(resourcePath);
            if (credentialsStream == null) {
                throw new IOException("Resource not found: " + resourcePath);
            }
        } else {
            credentialsStream = Files.newInputStream(Paths.get(credentialsPath));
        }
        GoogleCredentials credentials = GoogleCredentials.fromStream(credentialsStream);
        TextToSpeechSettings settings = TextToSpeechSettings.newBuilder()
                .setCredentialsProvider(FixedCredentialsProvider.create(credentials))
                .build();
        return TextToSpeechClient.create(settings);
    }
}