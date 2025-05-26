package com.hcmus.softdes.aivideocreator.domain.service;

import com.hcmus.softdes.aivideocreator.domain.model.Project;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface ProjectService {
    Project createProject(Project project);
    Optional<Project> getProjectById(UUID id);
    List<Project> getProjectsByUserId(int userId);
    void deleteProject(UUID id);
}
