package com.hcmus.softdes.aivideocreator.domain.model;

import com.hcmus.softdes.aivideocreator.domain.common.Entity;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

import java.time.LocalDateTime;
import java.util.UUID;

@Getter
@Setter
@SuperBuilder
public class MediaAsset extends Entity {
    private String name;
    private String type; // e.g., "image", "video", "audio"
    private String url; // URL or path to the media asset
    private UUID projectId; // Optional: if the media asset is associated with a project

    public MediaAsset(UUID id, LocalDateTime createdAt, LocalDateTime updatedAt, String name, String type, String url, UUID projectId) {
        super(id, createdAt, updatedAt);
        this.name = name;
        this.type = type;
        this.url = url;
        this.projectId = projectId; // Default to null, can be set later if needed
    }

    public static MediaAsset create(String name, String type, String url, UUID projectId) {
        return new MediaAsset(
            UUID.randomUUID(),
            LocalDateTime.now(),
            LocalDateTime.now(),
            name,
            type,
            url,
            projectId
        );
    }

}
