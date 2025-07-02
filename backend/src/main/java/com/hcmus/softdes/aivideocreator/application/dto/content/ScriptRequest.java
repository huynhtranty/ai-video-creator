package com.hcmus.softdes.aivideocreator.application.dto.content;

public record ScriptRequest(
    String prompt,
    String provider,
    String projectId
) {}
