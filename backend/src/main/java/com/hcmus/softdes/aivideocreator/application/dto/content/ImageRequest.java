package com.hcmus.softdes.aivideocreator.application.dto.content;

public record ImageRequest(
    String prompt,
    String context,
    String provider,
    String projectId,
    String scriptId
) {}
