package com.hcmus.softdes.aivideocreator.application.dto.content;

public record ScriptLayoutRequest(
    String prompt,
    String provider,
    String projectId,
    String scriptStyle,
    String scriptModel,
    String audioGender,
    String audioLanguage,
    Double audioSpeedRate,
    String audioModel,
    String imageStyle
) {}
