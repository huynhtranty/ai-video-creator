package com.hcmus.softdes.aivideocreator.domain.model;

import com.hcmus.softdes.aivideocreator.domain.common.Entity;
import com.hcmus.softdes.aivideocreator.domain.enums.Gender;
import lombok.experimental.SuperBuilder;

import java.time.LocalDateTime;
import java.util.UUID;

@SuperBuilder
public class Voice extends Entity {
    String name;
    String languageCode;
    String voiceName;
    Gender gender;
    UUID projectId;

    public Voice(UUID id, LocalDateTime createAt, LocalDateTime updateAt, String name, String languageCode, String voice, Gender gender, UUID projectId) {
        super(id, createAt, updateAt);
        this.name = name;
        this.languageCode = languageCode;
        this.voiceName = voice;
    }
}
