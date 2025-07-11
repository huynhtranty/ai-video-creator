package com.hcmus.softdes.aivideocreator.application.dto.voice;

import lombok.Data;

@Data
public class TtsRequest {
    private String text;
    private String languageCode;
    private double speakingRate;
    private String gender;
    private String projectId;
    private String scriptId;
    private String provider;

    public TtsRequest(
        String text,
        String provider,
        String languageCode,
        double speakingRate,
        String gender,
        String projectId,
        String scriptId
    ) {
        this.text = text;
        this.languageCode = languageCode;
        this.speakingRate = speakingRate == 0 ? 1.0 : speakingRate;
        this.gender = gender;
        this.projectId = projectId;
        this.scriptId = scriptId;
        this.provider = provider;
    }
}
