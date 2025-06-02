package com.hcmus.softdes.aivideocreator.api.contracts.auth;

public record GoogleAuthRequest(
    String accessToken,
    String idToken
) {}
