package com.hcmus.softdes.aivideocreator.infrastructure.jpa;

import com.hcmus.softdes.aivideocreator.infrastructure.entity.ScriptEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface ScriptJpaRepository extends JpaRepository<ScriptEntity, UUID> {

    // Custom query methods can be defined here if needed
    // For example, to find scripts by project ID:
    // List<Script> findByProjectId(String projectId);
    List<ScriptEntity> findByProjectId(UUID projectId);

    // Note: The actual implementation of the repository methods will be handled by Spring Data JPA
}
