package com.hcmus.softdes.aivideocreator.domain.entity;

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
}