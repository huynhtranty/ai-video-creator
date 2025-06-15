package com.hcmus.softdes.aivideocreator.infrastructure.jpa;

import com.hcmus.softdes.aivideocreator.domain.model.Voice;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface VoiceJpaRepository extends JpaRepository<Voice, UUID> {
    // This interface will automatically provide CRUD operations for the Voice entity.
    public Voice findByNameAndLanguageCodeAndVoiceName(String name, String languageCode, String voiceName);
}
