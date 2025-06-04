package com.hcmus.softdes.aivideocreator.infrastructure.mapper;

import com.hcmus.softdes.aivideocreator.domain.model.Video;
import com.hcmus.softdes.aivideocreator.infrastructure.entity.VideoEntity;

public class VideoMapper {

    public static VideoEntity toJpaVideoEntity(Video video) {
        if (video == null) {
            return null;
        }
        return VideoEntity.builder()
                .id(video.getId())
                .projectId(video.getProjectId())
                .title(video.getTitle())
                .filePath(video.getFilePath())
                .creationDate(video.getCreatedAt())
                .status(video.getStatus())
                .platform(video.getPlatform())
                .duration(video.getDuration())
                .description(video.getDescription())
                .userId(video.getUserId())
                .build();
    }

    public static Video toDomainVideo(VideoEntity jpaEntity) {
        if (jpaEntity == null) {
            return null;
        }

        return Video.builder()
                .id(jpaEntity.getId())
                .createdAt(jpaEntity.getCreationDate())
                .updatedAt(jpaEntity.getCreationDate())
                .projectId(jpaEntity.getProjectId())
                .userId(jpaEntity.getUserId())
                .filePath(jpaEntity.getFilePath())
                .platform(jpaEntity.getPlatform())
                .title(jpaEntity.getTitle())
                .duration(jpaEntity.getDuration())
                .status(jpaEntity.getStatus())
                .description(jpaEntity.getDescription())
                .build();
    }

}
