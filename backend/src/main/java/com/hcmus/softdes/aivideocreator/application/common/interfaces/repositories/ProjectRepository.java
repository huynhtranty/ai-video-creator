package com.hcmus.softdes.aivideocreator.application.common.interfaces.repositories;

import com.hcmus.softdes.aivideocreator.domain.model.Project;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface ProjectRepository {
    Project save(Project project);
    Optional<Project> findById(UUID id);
    List<Project> findByUserId(int userId);
    void deleteById(UUID id);
}