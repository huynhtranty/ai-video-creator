package com.hcmus.softdes.aivideocreator.application.dto.projects;

import lombok.Builder;
import lombok.Value;

import java.util.UUID;

@Value
@Builder
public class ProjectItemDto {
    UUID id;
    UUID userId;
    String name;
    String thumbnailUrl;
}
