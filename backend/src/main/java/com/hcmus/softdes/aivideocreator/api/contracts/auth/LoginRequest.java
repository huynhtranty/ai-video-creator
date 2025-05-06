package com.hcmus.softdes.aivideocreator.api.contracts.auth;

public record LoginRequest(
    String username,
    String password
) {}