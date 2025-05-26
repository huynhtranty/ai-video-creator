package com.hcmus.softdes.aivideocreator.infrastructure.entity;

import com.hcmus.softdes.aivideocreator.domain.model.Project;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "Project")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProjectEntity {
    @Id
    @Column(columnDefinition = "BINARY(16)")
    private UUID id;

    @Column(name = "user_id", nullable = false)
    private int userId;

    @Column(nullable = false)
    private String name;

    @Column(name = "creation_date", nullable = false)
    private LocalDateTime creationDate;

    @Column(name = "last_modified", nullable = false)
    private LocalDateTime lastModified;

    // Convert sang domain model
    public Project toDomain() {
        return new Project(
                this.id,
                this.creationDate,
                this.lastModified,
                this.userId,
                this.name,
                this.creationDate,
                this.lastModified
        );
    }

    // Chuyển từ domain sang entity
    public static ProjectEntity fromDomain(Project project) {
        return ProjectEntity.builder()
                .id(project.getId())
                .userId(project.getUserId())
                .name(project.getName())
                .creationDate(project.getCreationDate())
                .lastModified(project.getLastModified())
                .build();
    }
}
