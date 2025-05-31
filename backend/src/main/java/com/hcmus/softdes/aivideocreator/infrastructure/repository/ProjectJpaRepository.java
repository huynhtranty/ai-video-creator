package com.hcmus.softdes.aivideocreator.infrastructure.repository;

import com.hcmus.softdes.aivideocreator.infrastructure.entity.ProjectEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface ProjectJpaRepository extends JpaRepository<ProjectEntity, UUID> {
    List<ProjectEntity> findByUserId(UUID userId);
}
