package com.hcmus.softdes.aivideocreator.domain.common;

import lombok.Getter;

import java.time.LocalDateTime;
import java.util.UUID;

@Getter
public abstract class Entity {
    private final UUID id;
    private final LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    protected Entity(UUID id, LocalDateTime createdAt, LocalDateTime updatedAt) {
        this.id = id;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    public void update() {
        this.updatedAt = LocalDateTime.now();
    }
}
