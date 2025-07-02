package com.hcmus.softdes.aivideocreator.infrastructure.repositories;

import com.hcmus.softdes.aivideocreator.application.common.repositories.GoogleTokenRepository;
import com.hcmus.softdes.aivideocreator.domain.model.GoogleInfo;
import org.springframework.stereotype.Repository;

import java.time.Instant;
import java.util.Map;

@Repository
public class InMemoryGoogleTokenRepository implements GoogleTokenRepository {
    private Map<String, GoogleInfo> tokenStore;

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
}
