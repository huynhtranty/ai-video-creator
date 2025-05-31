package com.hcmus.softdes.aivideocreator.infrastructure.repository;

import com.hcmus.softdes.aivideocreator.infrastructure.entity.VideoEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface VideoJpaRepository extends JpaRepository<VideoEntity, UUID> {
     List<VideoEntity> findByUserId(UUID userId);
     List<VideoEntity> findByProjectId(UUID projectId);
}
