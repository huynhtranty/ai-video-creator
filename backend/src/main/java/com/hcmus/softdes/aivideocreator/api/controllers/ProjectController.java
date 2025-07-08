package com.hcmus.softdes.aivideocreator.api.controllers;

import com.hcmus.softdes.aivideocreator.application.dto.projects.ProjectDto;
import com.hcmus.softdes.aivideocreator.application.dto.projects.ProjectItemDto;
import com.hcmus.softdes.aivideocreator.domain.model.Project;
import com.hcmus.softdes.aivideocreator.application.service.ProjectService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/projects")
public class ProjectController {

    private final ProjectService projectService;
    private final AuthenticationManager authenticationManager;

    public ProjectController(ProjectService projectService, AuthenticationManager authenticationManager) {
        this.projectService = projectService;
        this.authenticationManager = authenticationManager;
    }

    @PostMapping
    public ResponseEntity<Project> create(@RequestBody ProjectDto request) {
        Project saved = projectService.createProject(request);
        return ResponseEntity.ok(saved);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProjectDto> getById(@PathVariable UUID id) {
        ProjectDto dto = projectService.getProjectWithAssets(id);
        return ResponseEntity.ok(dto);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Project> update(@PathVariable UUID id, @RequestBody ProjectDto request) {
        Project updated = projectService.updateProject(id, request);
        return ResponseEntity.ok(updated);
    }

    @GetMapping
    public ResponseEntity<List<ProjectItemDto>> getByUser(@RequestParam (name = "v", required = false) String varient) {
        UUID userId = UUID.fromString(SecurityContextHolder.getContext().getAuthentication().getDetails().toString());
        if (varient != null && varient.equals("recent")) {
            List<ProjectItemDto> recentProjects = projectService.getRecentProjectsByUserId(userId);
            return ResponseEntity.ok(recentProjects);
        }
        List<ProjectItemDto> projects = projectService.getProjectsByUserId(userId);
        return ResponseEntity.ok(projects);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable UUID id) {
        projectService.deleteProject(id);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("{id}/assets")
    public ResponseEntity<Void> deleteAssets(@PathVariable UUID id) {
        projectService.deleteMediaByProjectId(id);
        return ResponseEntity.noContent().build();
    }
}