package com.hcmus.softdes.aivideocreator.infrastructure.repositories;

import org.springframework.beans.factory.annotation.Value; // <-- use this import

import com.hcmus.softdes.aivideocreator.application.common.repositories.GoogleTokenRepository;
import com.hcmus.softdes.aivideocreator.domain.model.GoogleInfo;
import org.springframework.stereotype.Repository;
import org.springframework.http.*;
import org.springframework.web.client.RestTemplate;

import java.time.Instant;

import java.util.Map;

@Repository
public class InMemoryGoogleTokenRepository implements GoogleTokenRepository {
    private Map<String, GoogleInfo> tokenStore;
    @Value("${google.client.id}")
    private String clientId;
    @Value("${google.client.secret}")
    private String clientSecret;

    public InMemoryGoogleTokenRepository() {
        this.tokenStore = new java.util.HashMap<>();
    }

    @Override
    public void saveToken(String email, String accessToken, String refreshToken, Instant expiresAt) {
        GoogleInfo googleInfo = GoogleInfo.builder()
                .email(email)
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .expiresAt(expiresAt.toEpochMilli())
                .build();
        tokenStore.put(email, googleInfo);
    }

    @Override
    public String getAccessToken(String email) {
        GoogleInfo googleInfo = tokenStore.get(email);
        if (googleInfo != null && googleInfo.getExpiresAt() > Instant.now().toEpochMilli()) {
            return googleInfo.getAccessToken();
        }
        return null;
    }

    @Override
    public String getRefreshToken(String email) {
        GoogleInfo googleInfo = tokenStore.get(email);
        if (googleInfo != null) {
            return googleInfo.getRefreshToken();
        }
        return null;
    }

    @Override
    public String refreshAccessToken(String refreshToken) {
        if (refreshToken == null) {
            throw new IllegalStateException("No refresh token found for email: ");
        }
        RestTemplate restTemplate = new RestTemplate();
        String url = "https://oauth2.googleapis.com/token";

        org.springframework.util.MultiValueMap<String, String> params = new org.springframework.util.LinkedMultiValueMap<>();
        params.add("client_id", clientId);
        params.add("client_secret", clientSecret);
        params.add("refresh_token", refreshToken);
        params.add("grant_type", "refresh_token");

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        HttpEntity<org.springframework.util.MultiValueMap<String, String>> request = new HttpEntity<>(params, headers);

        ResponseEntity<Map> response = restTemplate.postForEntity(url, request, Map.class);
        if (response.getStatusCode() == HttpStatus.OK && response.getBody() != null) {
            return (String) response.getBody().get("access_token");
        }
        return null;
    }
}
