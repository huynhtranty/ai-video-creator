package com.hcmus.softdes.aivideocreator.application.project;

import com.hcmus.softdes.aivideocreator.domain.model.Project;
import com.hcmus.softdes.aivideocreator.application.common.interfaces.repositories.ProjectRepository;
import com.hcmus.softdes.aivideocreator.domain.service.ProjectService;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class ProjectServiceImp implements ProjectService {

    private final ProjectRepository projectRepository;

    public ProjectServiceImp(ProjectRepository projectRepository) {
        this.projectRepository = projectRepository;
    }

    @Override
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

    @Override
    public Optional<Project> getProjectById(UUID id) {
        return projectRepository.findById(id);
    }

    @Override
    public List<Project> getProjectsByUserId(int userId) {
        return projectRepository.findByUserId(userId);
    }

    @Override
    public void deleteProject(UUID id) {
        projectRepository.deleteById(id);
    }
}
