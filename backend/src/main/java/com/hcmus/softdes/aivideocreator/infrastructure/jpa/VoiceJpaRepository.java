package com.hcmus.softdes.aivideocreator.infrastructure.jpa;

import com.hcmus.softdes.aivideocreator.domain.model.Voice;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface VoiceJpaRepository extends JpaRepository<Voice, UUID> {
    public Voice findByNameAndLanguageCodeAndVoiceName(String name, String languageCode, String voiceName);
}
