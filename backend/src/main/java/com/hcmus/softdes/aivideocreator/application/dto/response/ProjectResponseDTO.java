package com.hcmus.softdes.aivideocreator.application.dto.response;

import lombok.Data;

import java.util.UUID;

@Data
public class ProjectResponseDTO {
    private UUID id;
    private UUID userId;
    private String name;
}