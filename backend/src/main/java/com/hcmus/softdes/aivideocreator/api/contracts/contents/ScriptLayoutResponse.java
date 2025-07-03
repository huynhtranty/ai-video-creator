package com.hcmus.softdes.aivideocreator.api.contracts.contents;

import lombok.Builder;

@Builder
public record ScriptLayoutResponse (
    String context,
    String language,
    ScriptResponse[] scripts
) {}
