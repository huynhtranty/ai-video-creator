package com.hcmus.softdes.aivideocreator.api.contracts.auth;

public record AuthResponse (
    UserResponse user,
    String token
) {}
