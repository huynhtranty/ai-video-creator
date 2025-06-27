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
public class Script extends Entity {
    private String content;
    private UUID projectId;

    public Script(UUID id, String content, UUID projectId, LocalDateTime createdAt, LocalDateTime updatedAt) {
        super(id, createdAt, updatedAt);
        this.content = content;
        this.projectId = projectId;
    }

    public static Script create(String content, UUID projectId) {
        return new Script(UUID.randomUUID(), content, projectId, LocalDateTime.now(), LocalDateTime.now());
    }
}
