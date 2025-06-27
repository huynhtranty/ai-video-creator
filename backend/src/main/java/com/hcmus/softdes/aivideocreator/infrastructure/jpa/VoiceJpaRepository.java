package com.hcmus.softdes.aivideocreator.infrastructure.jpa;

import com.hcmus.softdes.aivideocreator.domain.model.Voice;
import com.hcmus.softdes.aivideocreator.infrastructure.entity.VoiceEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface VoiceJpaRepository extends JpaRepository<VoiceEntity, UUID> {
    // Custom query method to find voices by project ID
    List<VoiceEntity> findByProjectId(UUID projectId);
}
