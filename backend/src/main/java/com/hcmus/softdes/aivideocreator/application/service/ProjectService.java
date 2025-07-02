package com.hcmus.softdes.aivideocreator.application.service;

import com.hcmus.softdes.aivideocreator.application.common.repositories.MediaRepository;
import com.hcmus.softdes.aivideocreator.application.common.repositories.ScriptRepository;
import com.hcmus.softdes.aivideocreator.application.common.repositories.VoiceRepository;
import com.hcmus.softdes.aivideocreator.application.dto.projects.ProjectDto;
import com.hcmus.softdes.aivideocreator.domain.model.MediaAsset;
import com.hcmus.softdes.aivideocreator.domain.model.Project;
import com.hcmus.softdes.aivideocreator.application.common.repositories.ProjectRepository;
import org.springframework.stereotype.Service;

import javax.print.attribute.standard.Media;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class ProjectService {

    private final ProjectRepository projectRepository;
    private final MediaRepository mediaRepository;
    private final VoiceRepository voiceRepository;
    private final ScriptRepository scriptRepository;

    public ProjectService(ProjectRepository projectRepository,
                          MediaRepository mediaRepository,
                          VoiceRepository voiceRepository,
                          ScriptRepository scriptRepository) {

        this.projectRepository = projectRepository;
        this.mediaRepository = mediaRepository;
        this.voiceRepository = voiceRepository;
        this.scriptRepository = scriptRepository;
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

    public ProjectDto getProjectWithAssets(UUID projectId) {
        Project project = projectRepository.findById(projectId).orElseThrow();
        MediaAsset media = mediaRepository.findMediaByProjectId(projectId);

//
//        ProjectDto dto = mapToDto(project);
//        dto.setMedia(media.stream().map(this::mapToMediaDto).toList());
//        dto.setVoice(voice.stream().map(this::mapToVoiceDto).toList());
//        dto.setScript(script.stream().map(this::mapToScriptDto).toList());
        return null;
    }

    public Optional<Project> getProjectById(UUID id) {
        if (id == null) {
            throw new IllegalArgumentException("Project ID cannot be null");
        }
        return projectRepository.findById(id);
    }

    public List<Project> getProjectsByUserId(UUID userId) {
        if (userId == null) {
            throw new IllegalArgumentException("User ID cannot be null");
        }
        return projectRepository.findByUserId(userId);
    }

    public void deleteProject(UUID id) {
        if (id == null) {
            throw new IllegalArgumentException("Project ID cannot be null");
        }
        if (!projectRepository.existsById(id)) {
            throw new IllegalArgumentException("Project with this ID does not exist.");
        }
        projectRepository.deleteById(id);
        if (projectRepository.existsById(id)) {
            throw new RuntimeException("Failed to delete project");
        }
    }
}