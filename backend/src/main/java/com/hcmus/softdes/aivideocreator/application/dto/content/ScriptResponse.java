package com.hcmus.softdes.aivideocreator.application.dto.content;

public record ScriptResponse(
    String content,
    String provider,
    int order
) {}
