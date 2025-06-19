package com.hcmus.softdes.aivideocreator.infrastructure.entity;

import com.hcmus.softdes.aivideocreator.domain.enums.Platform;
import com.hcmus.softdes.aivideocreator.domain.enums.Status;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.*;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "voice")
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class VoiceEntity {
    @Id
    @Column(nullable = false)
    private UUID id;

    @Column(name = "fileName", nullable = false)
    private String fileName;

    @Column(name = "provider")
    private String provider;

    @Column(name = "project_id", nullable = false)
    private UUID projectId;

    @Column(name = "creation_date", nullable = false)
    private LocalDateTime creationDate;

}
