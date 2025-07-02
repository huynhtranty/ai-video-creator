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

    @Column(name = "text", nullable = false)
    private String text;

    @Column(name = "provider")
    private String provider;

    @Column(name = "language_code", nullable = false, columnDefinition = "VARCHAR(10) DEFAULT 'en-US'")
    private String languageCode;

    @Column(name = "url", nullable = false)
    private String url;

    @Column(name = "duration", nullable = false)
    private int duration; // Duration in seconds

    @Column(name = "voiceGender", nullable = false)
    String voiceGender;

    @Column(name ="speaking_rate", nullable = false, columnDefinition = "DOUBLE DEFAULT 1.0")
    private double speakingRate;

    @Column(name = "project_id", nullable = false)
    private UUID projectId;

    @Column(name = "script_id", nullable = false)
    private UUID scriptId;

    @Column(name = "creation_date", nullable = false)
    private LocalDateTime creationDate;

}
