package com.hcmus.softdes.aivideocreator.application.service;

import com.hcmus.softdes.aivideocreator.application.dto.projects.ProjectDto;
import com.hcmus.softdes.aivideocreator.domain.model.Project;
import com.hcmus.softdes.aivideocreator.application.common.repositories.ProjectRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class ProjectService {

    private final ProjectRepository projectRepository;

    public ProjectService(ProjectRepository projectRepository) {
        this.projectRepository = projectRepository;
    }


    public Project createProject(ProjectDto project) {
        var existingProject = projectRepository.findByProjectName(project.getName());
        if (existingProject.isPresent()) {
            throw new IllegalArgumentException("Project with this ID already exists.");
        }
        Project newProject = Project.create(
            project.getUserId(),
            project.getName()
        );

        return projectRepository.save(newProject);
    }

    public Optional<Project> getProjectById(UUID id) {
        return projectRepository.findById(id);
    }

    public List<Project> getProjectsByUserId(UUID userId) {
        return projectRepository.findByUserId(userId);
    }

    public void deleteProject(UUID id) {
        projectRepository.deleteById(id);
    }
}