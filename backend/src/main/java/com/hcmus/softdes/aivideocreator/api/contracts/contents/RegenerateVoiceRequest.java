package com.hcmus.softdes.aivideocreator.api.contracts.contents;

public record RegenerateVoiceRequest(
    String provider,
    String gender,
    String language,
    double speedRate,
    String model
) {}
