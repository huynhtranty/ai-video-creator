package com.hcmus.softdes.aivideocreator.domain.model;

import com.hcmus.softdes.aivideocreator.domain.common.Entity;
import com.hcmus.softdes.aivideocreator.domain.enums.Platform;
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
    String youtubeId;
    String thumbnailUrl;
    Status status;
    Platform platform; // Optional field for social media platform
    int duration;
    UUID projectId;
    UUID userId;

    public Video(
        UUID id,
        String title,
        String description,
        String filePath,
        Status status,
        String YoutubeId,
        String thumbnailUrl,
        Platform platform,
        int duration,
        UUID projectId,
        UUID userId
    ) {
        super(id, LocalDateTime.now() , LocalDateTime.now());
        this.title = title;
        this.description = description;
        this.filePath = filePath;
        this.status = status;
        this.youtubeId = YoutubeId;
        this.thumbnailUrl = thumbnailUrl;
        this.platform = platform;
        this.duration = duration;
        this.projectId = projectId;
        this.userId = userId;
    }

    public static Video create(
        String title,
        String description,
        String filePath,
        Status status,
        String YoutubeId,
        String thumbnailUrl,
        Platform platform,
        int duration,
        UUID projectId,
        UUID userId
    ) {
        return new Video(
            UUID.randomUUID(),
            title,
            description,
            filePath,
            status,
            YoutubeId,
            thumbnailUrl,
            platform,
            duration,
            projectId,
            userId
        );
    }
}
