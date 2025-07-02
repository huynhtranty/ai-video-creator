package com.hcmus.softdes.aivideocreator.application.dto.projects;

import com.hcmus.softdes.aivideocreator.application.dto.content.ScriptResponse;
import com.hcmus.softdes.aivideocreator.application.dto.media.MediaResponse;
import com.hcmus.softdes.aivideocreator.application.dto.script.ScriptDto;
import com.hcmus.softdes.aivideocreator.application.dto.voice.TtsResponse;
import lombok.*;

import java.util.List;
import java.util.UUID;


@Value
@Builder
@Getter
@Setter
public class ProjectDto {
    UUID userId;
    String name;
    List<ScriptDto> scripts;
}
