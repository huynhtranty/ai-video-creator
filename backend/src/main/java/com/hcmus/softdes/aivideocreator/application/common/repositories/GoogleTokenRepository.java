package com.hcmus.softdes.aivideocreator.application.common.interfaces.repositories;

import java.time.Instant;

public interface GoogleTokenRepository {
    void saveToken(String email, String accessToken, String refreshToken, Instant expiresAt);
}
