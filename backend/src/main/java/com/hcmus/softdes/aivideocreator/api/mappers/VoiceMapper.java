package com.hcmus.softdes.aivideocreator.api.mappers;

import com.hcmus.softdes.aivideocreator.domain.model.Voice;
import com.hcmus.softdes.aivideocreator.application.dto.voice.TtsResponse;

public class VoiceMapper {

    public static TtsResponse toDto(Voice voice) {
        if (voice == null) return null;
        return TtsResponse.builder()
                .audioUrl(voice.getUrl())
                .format("mp3")
                .duration(voice.getDuration())
                .ProjectId(voice.getProjectId().toString())
                .build();
    }
}