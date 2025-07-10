package com.hcmus.softdes.aivideocreator.application.dto.content;

public record ScriptLayoutRequest(
    String prompt,
    String provider,
    String projectId
) {}
