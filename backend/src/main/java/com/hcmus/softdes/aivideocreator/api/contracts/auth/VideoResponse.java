package com.hcmus.softdes.aivideocreator.api.contracts.auth;

import com.azure.core.annotation.Get;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Builder
public record VideoResponse (
    String id,
    String title,
    String description,
    String filePath,
    String status,
    String platform,
    String userId,
    String projectId,
    String createdAt,
    String updatedAt
)
{}
