package com.hcmus.softdes.aivideocreator.infrastructure.jpa;

import com.hcmus.softdes.aivideocreator.domain.model.Voice;
import com.hcmus.softdes.aivideocreator.infrastructure.entity.VoiceEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface VoiceJpaRepository extends JpaRepository<VoiceEntity, UUID> {
}
