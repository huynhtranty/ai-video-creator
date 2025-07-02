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
    private int order;

    public Script(UUID id, String content, UUID projectId, LocalDateTime createdAt, LocalDateTime updatedAt, int order) {
        super(id, createdAt, updatedAt);
        this.content = content;
        this.projectId = projectId;
        this.order = order;
    }

    public static Script create(String content, UUID projectId, int order) {
        return new Script(UUID.randomUUID(), content, projectId, LocalDateTime.now(), LocalDateTime.now(), order);
    }
}
