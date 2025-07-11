package com.hcmus.softdes.aivideocreator.infrastructure.mapper;

import com.hcmus.softdes.aivideocreator.domain.model.MediaAsset;
import com.hcmus.softdes.aivideocreator.infrastructure.entity.MediaEntity;

public class MediaMapper {
    public static MediaEntity toMediaEntity(MediaAsset media) {
        if (media == null) {
            return null;
        }
        return MediaEntity.builder()
                .id(media.getId())
                .projectId(media.getProjectId())
                .text(media.getText())
                .url(media.getUrl())
                .provider(media.getProvider())
                .filename(media.getFilename())
                .scriptId(media.getScriptId())
                .creationDate(media.getCreatedAt())
                .lastModified(media.getUpdatedAt())
                .build();

    }

    public static MediaAsset toDomainMedia(MediaEntity jpaEntity) {
        if (jpaEntity == null) {
            return null;
        }
        return MediaAsset.builder()
                .id(jpaEntity.getId())
                .projectId(jpaEntity.getProjectId())
                .text(jpaEntity.getText())
                .url(jpaEntity.getUrl())
                .provider(jpaEntity.getProvider())
                .filename(jpaEntity.getFilename())
                .scriptId(jpaEntity.getScriptId())
                .createdAt(jpaEntity.getCreationDate())
                .updatedAt(jpaEntity.getLastModified())
                .build();
    }
}
