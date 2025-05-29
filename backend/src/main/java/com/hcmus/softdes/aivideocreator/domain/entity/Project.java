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
    private int userId;
    private String name;
    private LocalDateTime creationDate;
    private LocalDateTime lastModified;

    public Project(UUID id, LocalDateTime createdAt, LocalDateTime updatedAt,
                   int userId, String name, LocalDateTime creationDate, LocalDateTime lastModified) {
        super(id, createdAt, updatedAt);
        this.userId = userId;
        this.name = name;
        this.creationDate = creationDate;
        this.lastModified = lastModified;
    }
}