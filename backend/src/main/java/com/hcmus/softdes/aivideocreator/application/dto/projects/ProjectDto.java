package com.hcmus.softdes.aivideocreator.application.dto.projects;

import lombok.Builder;
import lombok.Value;

import java.util.UUID;

@Value
@Builder
public class ProjectDto {
    UUID userId;
    String name;
}
