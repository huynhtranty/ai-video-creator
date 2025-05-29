package com.hcmus.softdes.aivideocreator.infrastructure.mapper;

import com.hcmus.softdes.aivideocreator.domain.entity.Video;
import com.hcmus.softdes.aivideocreator.infrastructure.entity.UserEntity;
import com.hcmus.softdes.aivideocreator.infrastructure.entity.VideoEntity;

public class VideoMapper {

    public static VideoEntity toJpaEntity(Video video) {
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
                .duration(video.getDuration())
                .description(video.getDescription())
                .build();
    }

    public static Video toDomainEntity(VideoEntity jpaEntity) {
        if (jpaEntity == null) {
            return null;
        }

        return Video.builder()
                .id(jpaEntity.getId())
                .createdAt(jpaEntity.getCreationDate())
                .updatedAt(jpaEntity.getCreationDate())
                .projectId(jpaEntity.getProjectId())
                .filePath(jpaEntity.getFilePath())
                .title(jpaEntity.getTitle())
                .status(jpaEntity.getStatus())
                .description(jpaEntity.getDescription())
                .build();
    }

}
