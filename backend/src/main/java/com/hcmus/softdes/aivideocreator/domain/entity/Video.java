package com.hcmus.softdes.aivideocreator.domain.entity;

import com.hcmus.softdes.aivideocreator.domain.common.Entity;
import com.hcmus.softdes.aivideocreator.domain.enums.Status;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

import java.time.LocalDateTime;
import java.util.UUID;

@SuperBuilder
@Getter
@Setter
public class Video extends Entity {
    String title;
    String description;
    String filePath;
    Status status;
    int duration;
    UUID projectId;
    UUID userId;

    public Video(UUID id, LocalDateTime createAt, LocalDateTime updateAt, String title, String description,
                 String filePath, Status status, int duration, UUID projectId, UUID userId) {
        super(id, createAt, updateAt); // Assuming createdAt and updatedAt are not used in this context
        this.title = title;
        this.description = description;
        this.filePath = filePath;
        this.status = status;
        this.duration = duration;
        this.projectId = projectId;
        this.userId = userId;
    }
}
