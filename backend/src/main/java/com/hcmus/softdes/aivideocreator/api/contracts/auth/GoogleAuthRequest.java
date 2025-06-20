package com.hcmus.softdes.aivideocreator.api.contracts.auth;

import java.time.Instant;

public record GoogleAuthRequest(
        String email,
        String name,
        String accessToken,
        String refreshToken,
        Instant expiresAt
) {}