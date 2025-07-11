package com.hcmus.softdes.aivideocreator.api.mappers;

import com.hcmus.softdes.aivideocreator.application.dto.video.VideoDto;
import com.hcmus.softdes.aivideocreator.domain.model.Video;

import java.util.UUID;

public class VideoMapper {
    public static Video toVideo(VideoDto videoDto) {
        return new Video(
            UUID.randomUUID(),
            videoDto.getTitle(),
            videoDto.getDescription(),
            videoDto.getFilePath(),
            videoDto.getStatus(),
            videoDto.getPlatform(),
            videoDto.getDuration(),
            videoDto.getProjectId(),
            videoDto.getUserId()
        );
    }

    public static VideoDto toVideoDto(Video video) {
        return VideoDto.builder()
            .id(video.getId())
            .title(video.getTitle())
            .description(video.getDescription())
            .filePath(video.getFilePath())
            .status(video.getStatus())
            .platform(video.getPlatform())
            .duration(video.getDuration())
            .projectId(video.getProjectId())
            .userId(video.getUserId())
            .createdAt(video.getCreatedAt().toString())
            .updatedAt(video.getUpdatedAt().toString())
            .build();
    }
}
