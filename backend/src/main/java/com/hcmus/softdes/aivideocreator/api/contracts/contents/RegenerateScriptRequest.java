package com.hcmus.softdes.aivideocreator.api.contracts.contents;

public record RegenerateScriptRequest(
    String provider,
    String scriptModel,
    String scriptStyle
) {}
