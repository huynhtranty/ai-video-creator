package com.hcmus.softdes.aivideocreator.api.mappers;

import com.hcmus.softdes.aivideocreator.application.dto.media.MediaResponse;
import com.hcmus.softdes.aivideocreator.domain.model.MediaAsset;

public class MediaMapper {
    public static MediaResponse toDto(MediaAsset media) {
        if (media == null) return null;
        return new MediaResponse(
            media.getId().toString(),
            media.getUrl(),
            "jpg",
            media.getName(),
            media.getProjectId().toString(),
            media.getCreatedAt().toString(),
            media.getUpdatedAt().toString()
        );

    }

}