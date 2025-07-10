package com.hcmus.softdes.aivideocreator.infrastructure.repositories;

import com.hcmus.softdes.aivideocreator.application.common.repositories.GoogleTokenRepository;
import com.hcmus.softdes.aivideocreator.domain.model.GoogleInfo;
import org.springframework.stereotype.Repository;
import org.springframework.http.*;
import org.springframework.web.client.RestTemplate;

import java.time.Instant;
import java.util.HashMap;
import java.util.Map;

@Repository
public class InMemoryGoogleTokenRepository implements GoogleTokenRepository {
    private Map<String, GoogleInfo> tokenStore;
    private final String clientId = "your-client-id"; // Replace with your actual client ID
    private final String clientSecret = "your-client";

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
        return null; // Token is not found
    }

    @Override
    public String refreshAccessToken(String email) {
        String refreshToken = getRefreshToken(email);
        RestTemplate restTemplate = new RestTemplate();
        String url = "https://oauth2.googleapis.com/token";

        Map<String, String> params = new HashMap<>();
        params.put("client_id", clientId);
        params.put("client_secret", clientSecret);
        params.put("refresh_token", refreshToken);
        params.put("grant_type", "refresh_token");

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        HttpEntity<Map<String, String>> request = new HttpEntity<>(params, headers);

        ResponseEntity<Map> response = restTemplate.postForEntity(url, request, Map.class);
        if (response.getStatusCode() == HttpStatus.OK && response.getBody() != null) {
            return (String) response.getBody().get("access_token");
        }
        return null;
    }
}
