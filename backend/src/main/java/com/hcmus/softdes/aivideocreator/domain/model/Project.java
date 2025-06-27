package com.hcmus.softdes.aivideocreator.domain.model;

import com.hcmus.softdes.aivideocreator.domain.common.Entity;

import lombok.Getter;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

import java.time.LocalDateTime;
import java.util.UUID;


@SuperBuilder
@Getter
@Setter
public class Project extends Entity {
    private UUID userId;
    private String name;

    public Project(UUID id, LocalDateTime createdAt, LocalDateTime updatedAt,
                   UUID userId, String name) {
        super(id, createdAt, updatedAt);
        this.userId = userId;
        this.name = name;

    }

    public static Project create(UUID userId, String name) {
        return new Project(
            UUID.randomUUID(),
            LocalDateTime.now(),
            LocalDateTime.now(),
            userId,
            name
        );
    }
}