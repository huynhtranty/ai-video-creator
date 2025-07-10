package com.hcmus.softdes.aivideocreator.api.mappers;

import com.hcmus.softdes.aivideocreator.application.dto.script.ScriptDto;
import com.hcmus.softdes.aivideocreator.domain.model.Project;
import com.hcmus.softdes.aivideocreator.application.dto.projects.ProjectDto;

import java.util.List;

public class ProjectMapper {

    public static ProjectDto toDto(Project project, List<ScriptDto> scripts) {
        if (project == null) return null;
        return ProjectDto.builder()
                .userId(project.getUserId())
                .name(project.getName())
                .imageContext(project.getImageContext())
                .scripts(scripts)
                .build();
    }
}