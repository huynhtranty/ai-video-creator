package com.hcmus.softdes.aivideocreator.infrastructure.entity;

import com.hcmus.softdes.aivideocreator.domain.enums.Platform;
import com.hcmus.softdes.aivideocreator.domain.enums.Status;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.*;
import lombok.experimental.SuperBuilder;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "video")
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class VideoEntity {
    @Id
    @Column(nullable = false)
    private UUID id;

    @Column(name = "project_id", nullable = false)
    private UUID projectId;

    @Column(name = "user_id", nullable = false)
    private UUID userId;

    @Column(name = "title", nullable = false)
    private String title;

    @Column(name = "description")
    private String description;

    @Column(name = "file_path", nullable = false)
    private String filePath;

    @Column(name = "youtube_id")
    private String youtubeId; // Optional field for YouTube video ID

    @Column(name = "thumbnail_url")
    private String thumbnailUrl; // Optional field for video thumbnail

    @Column(name = "platform")
    private Platform platform; // Default to 'None'

    @Column(name = "status")
    private Status status; // Default to 'Unpublished'

    @Column(name = "duration", nullable = false)
    private int duration;

    @Column(name = "creation_date", nullable = false)
    private LocalDateTime creationDate;
}
