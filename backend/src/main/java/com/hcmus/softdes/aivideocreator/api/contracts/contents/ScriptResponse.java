package com.hcmus.softdes.aivideocreator.api.contracts.contents;

import lombok.Builder;

@Builder
public record ScriptResponse(
    String id,
    String content,
    String projectId,
    int order
) {}