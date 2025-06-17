package com.hcmus.softdes.aivideocreator.api.controllers;

import com.hcmus.softdes.aivideocreator.application.dto.projects.ProjectDto;
import com.hcmus.softdes.aivideocreator.domain.model.Project;
import com.hcmus.softdes.aivideocreator.application.service.ProjectService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/projects")
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
    public ResponseEntity<Project> getById(@PathVariable UUID id) {
        return projectService.getProjectById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping
    public ResponseEntity<List<Project>> getByUser() {
        UUID userId = UUID.fromString(SecurityContextHolder.getContext().getAuthentication().getDetails().toString());
        List<Project> projects = projectService.getProjectsByUserId(userId);
        return ResponseEntity.ok(projects);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable UUID id) {
        projectService.deleteProject(id);
        return ResponseEntity.noContent().build();
    }
}