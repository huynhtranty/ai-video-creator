package com.hcmus.softdes.aivideocreator.application.service;

import com.hcmus.softdes.aivideocreator.domain.entity.Project;
import com.hcmus.softdes.aivideocreator.application.common.interfaces.repositories.ProjectRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class ProjectService {

    private final ProjectRepository projectRepository;

    public ProjectService(ProjectRepository projectRepository) {
        this.projectRepository = projectRepository;
    }


    public Project createProject(Project project) {
        UUID id = UUID.randomUUID();
        LocalDateTime now = LocalDateTime.now();

        Project newProject = new Project(
                id,
                now,
                now,
                project.getUserId(),
                project.getName(),
                now,
                now
        );

        return projectRepository.save(newProject);
    }

    public Optional<Project> getProjectById(UUID id) {
        return projectRepository.findById(id);
    }

    public List<Project> getProjectsByUserId(int userId) {
        return projectRepository.findByUserId(userId);
    }

    public void deleteProject(UUID id) {
        projectRepository.deleteById(id);
    }
}