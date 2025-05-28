package com.hcmus.softdes.aivideocreator.domain.model;

import com.hcmus.softdes.aivideocreator.domain.common.Entity;

import com.hcmus.softdes.aivideocreator.domain.common.Entity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.experimental.SuperBuilder;

import java.time.LocalDateTime;
import java.util.UUID;


@SuperBuilder
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

    // Getters và setters (hoặc bạn có thể thêm lombok @Getter/@Setter nếu muốn)
    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public LocalDateTime getCreationDate() {
        return creationDate;
    }

    public LocalDateTime getLastModified() {
        return lastModified;
    }

    public void setLastModified(LocalDateTime lastModified) {
        this.lastModified = lastModified;
    }
}