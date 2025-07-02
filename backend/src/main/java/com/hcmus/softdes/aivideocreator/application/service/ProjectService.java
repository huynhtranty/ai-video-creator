package com.hcmus.softdes.aivideocreator.application.service;

import com.hcmus.softdes.aivideocreator.api.mappers.ProjectMapper;
import com.hcmus.softdes.aivideocreator.api.mappers.ScriptMapper;
import com.hcmus.softdes.aivideocreator.application.common.repositories.MediaRepository;
import com.hcmus.softdes.aivideocreator.application.common.repositories.ScriptRepository;
import com.hcmus.softdes.aivideocreator.application.common.repositories.VoiceRepository;
import com.hcmus.softdes.aivideocreator.application.dto.projects.ProjectDto;
import com.hcmus.softdes.aivideocreator.application.dto.script.ScriptDto;
import com.hcmus.softdes.aivideocreator.domain.model.MediaAsset;
import com.hcmus.softdes.aivideocreator.domain.model.Project;
import com.hcmus.softdes.aivideocreator.application.common.repositories.ProjectRepository;
import com.hcmus.softdes.aivideocreator.domain.model.Script;
import com.hcmus.softdes.aivideocreator.domain.model.Voice;
import org.springframework.stereotype.Service;

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
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new IllegalArgumentException("Project with this ID does not exist."));

        List<Script> scripts = scriptRepository.findScriptsByProjectId(projectId);

        List<ScriptDto> scriptDtos = scripts.stream().map(script -> {
            MediaAsset media = mediaRepository.findMediaByScriptId(script.getId());
            Voice voice = voiceRepository.findVoiceByScriptId(script.getId());
            ScriptDto scriptDto = ScriptMapper.toDto(script, media, voice);
            if (scriptDto == null) {
                throw new IllegalArgumentException("Script with ID " + script.getId() + " does not exist.");
            }
            return scriptDto;
        }).toList();

        return ProjectMapper.toDto(project, scriptDtos);
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
        // delete associated scripts, media, and voices
        List<Script> scripts = scriptRepository.findScriptsByProjectId(id);
        for (Script script : scripts) {
            mediaRepository.deleteMediaByScriptId(script.getId());
            voiceRepository.deleteVoiceByScriptId(script.getId());
            scriptRepository.deleteScriptById(script.getId());
        }
        if (projectRepository.existsById(id)) {
            throw new RuntimeException("Failed to delete project");
        }
    }

    public void deleteMediaByProjectId(UUID projectId) {
        if (projectId == null) {
            throw new IllegalArgumentException("Project ID cannot be null");
        }
        if (!projectRepository.existsById(projectId)) {
            throw new IllegalArgumentException("Project with this ID does not exist.");
        }
        List<Script> scripts = scriptRepository.findScriptsByProjectId(projectId);
        for (Script script : scripts) {
            mediaRepository.deleteMediaByScriptId(script.getId());
            voiceRepository.deleteVoiceByScriptId(script.getId());
            scriptRepository.deleteScriptById(script.getId());
        }
    }
}