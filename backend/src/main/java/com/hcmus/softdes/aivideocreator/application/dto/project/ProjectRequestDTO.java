package com.hcmus.softdes.aivideocreator.application.dto.project;

import lombok.Data;

import java.util.UUID;

@Data
public class ProjectRequestDTO {
    private UUID userId;
    private String name;
}