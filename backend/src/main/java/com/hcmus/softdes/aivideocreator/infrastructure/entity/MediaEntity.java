package com.hcmus.softdes.aivideocreator.infrastructure.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.*;
import lombok.experimental.SuperBuilder;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "MediaAsset")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder

public class MediaEntity {
    @Id
    @Column(columnDefinition = "BINARY(16)")
    private UUID id;

    @Column(name = "project_id", nullable = false)
    private UUID projectId;

    @Column(name = "asset_type", nullable = false)
    private String assetType;

    @Column(name = "file_path", nullable = false)
    private String filePath;

    @Column(name = "script_id", nullable = false)
    private UUID scriptId;

    @Column(name = "order_index", nullable = false)
    private int orderIndex;

    @Column(name = "creation_date", nullable = false)
    private LocalDateTime creationDate;

    @Column(name = "last_modified", nullable = false)
    private LocalDateTime lastModified;
}
