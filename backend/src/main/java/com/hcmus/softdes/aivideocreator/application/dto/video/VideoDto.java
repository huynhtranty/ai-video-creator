package com.hcmus.softdes.aivideocreator.application.dto.video;

import com.fasterxml.jackson.annotation.JsonIncludeProperties;
import com.hcmus.softdes.aivideocreator.domain.enums.Platform;
import com.hcmus.softdes.aivideocreator.domain.enums.Status;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

import java.util.UUID;

@SuperBuilder
@Getter
@Setter
@NoArgsConstructor
public class VideoDto {
    private UUID id;
    private String title;
    private String description;
    private String filePath;
    private UUID projectId;
    private UUID userId;
    private Status status;
    private String youtubeId;
    private String thumbnailUrl;
    private int duration;
    private Platform platform;
    private String createdAt;
    private String updatedAt;
}
