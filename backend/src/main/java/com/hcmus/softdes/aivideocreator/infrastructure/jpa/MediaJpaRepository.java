package com.hcmus.softdes.aivideocreator.infrastructure.jpa;

import com.hcmus.softdes.aivideocreator.infrastructure.entity.MediaEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface MediaJpaRepository extends JpaRepository<MediaEntity, UUID> {
        MediaEntity findByScriptId(UUID scriptId);
        // Custom query methods can be defined here if needed
        // For example, to find assets by project ID:
        // List<MediaAsset> findByProjectId(String projectId);
}
