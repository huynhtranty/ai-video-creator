package com.hcmus.softdes.aivideocreator.domain.project;

import com.hcmus.softdes.aivideocreator.domain.common.Entity;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.UUID;

@Getter
public class Project extends Entity {
    private String name;
    private String description;
    private String thumbnail;
    private String videoUrl;

    protected Project(
        UUID id,
        String name,
        String description,
        String thumbnail,
        String videoUrl,
        LocalDateTime createdAt,
        LocalDateTime updatedAt
    ) {
        super(id, createdAt, updatedAt);
        this.name = name;
        this.description = description;
        this.thumbnail = thumbnail;
        this.videoUrl = videoUrl;
    }

    public static Project create(
        UUID id,
        String name,
        String description,
        String thumbnail,
        String videoUrl,
        LocalDateTime createdAt,
        LocalDateTime updatedAt
    ) {
        return new Project(
            id,
            name,
            description,
            thumbnail,
            videoUrl,
            createdAt,
            updatedAt
        );
    }
}
