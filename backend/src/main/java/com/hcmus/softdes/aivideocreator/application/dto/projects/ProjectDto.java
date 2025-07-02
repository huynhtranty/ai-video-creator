package com.hcmus.softdes.aivideocreator.application.dto.projects;

import com.hcmus.softdes.aivideocreator.application.dto.content.ScriptResponse;
import com.hcmus.softdes.aivideocreator.application.dto.media.MediaResponse;
import com.hcmus.softdes.aivideocreator.application.dto.voice.TtsResponse;
import lombok.Builder;
import lombok.Value;

import java.util.List;
import java.util.UUID;

@Value
@Builder
public class ProjectDto {
    UUID userId;
    String name;
    List<MediaResponse> media;
    List<ScriptResponse> scripts;
    List<TtsResponse> ttsResponses;
}
