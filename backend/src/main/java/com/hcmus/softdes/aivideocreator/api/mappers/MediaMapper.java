package com.hcmus.softdes.aivideocreator.api.mappers;

import com.hcmus.softdes.aivideocreator.application.dto.media.MediaResponse;
import com.hcmus.softdes.aivideocreator.domain.model.MediaAsset;

public class MediaMapper {
    public static MediaResponse toDto(MediaAsset media) {
        if (media == null) return null;
        return MediaResponse.builder()
            .id(media.getId().toString())
            .text(media.getText())
            .url(media.getUrl())
            .provider(media.getProvider())
            .scriptId(media.getScriptId())
            .projectId(media.getProjectId())
            .build();
    }

}