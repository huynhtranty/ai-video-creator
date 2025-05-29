package com.hcmus.softdes.aivideocreator.api.contracts.auth;

import com.hcmus.softdes.aivideocreator.domain.entity.User;

public record AuthResponse (
    User user,
    String token
) {}
