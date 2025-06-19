package com.hcmus.softdes.aivideocreator.domain.model;

import com.azure.core.annotation.Get;
import com.hcmus.softdes.aivideocreator.domain.common.Entity;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

import java.time.LocalDateTime;
import java.util.UUID;

@SuperBuilder
@Data
public class Voice extends Entity {
    String text;
    String languageCode;
    String voiceGender;
    String provider;
    String url;
    double speakingRate;
    UUID projectId;

    public Voice(UUID id, LocalDateTime createAt, LocalDateTime updateAt, String text, String languageCode, String provider, String url, String gender, UUID projectId) {
        super(id, createAt, updateAt);
        this.text = text;
        this.languageCode = languageCode;
        this.provider = provider;
        this.url = url;
        this.voiceGender = gender;
        this.projectId = projectId;
    }

    public static Voice create(String text, String languageCode, String provider, String url, UUID projectId) {
        return new Voice(
            UUID.randomUUID(),
            LocalDateTime.now(),
            LocalDateTime.now(),
            text,
            languageCode,
            provider,
            url,
            "MALE",
            projectId);
    }
}
