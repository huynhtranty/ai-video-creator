package com.hcmus.softdes.aivideocreator.application.dto.project;

import lombok.Data;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
public class ProjectResponseDTO {
    private UUID id;
    private int userId;
    private String name;
    private LocalDateTime creationDate;
    private LocalDateTime lastModified;
}