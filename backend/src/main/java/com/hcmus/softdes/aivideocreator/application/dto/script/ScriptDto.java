package com.hcmus.softdes.aivideocreator.application.dto.script;

import com.hcmus.softdes.aivideocreator.application.dto.media.MediaResponse;
import com.hcmus.softdes.aivideocreator.application.dto.voice.TtsResponse;
import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
public class ScriptDto {
    private UUID id;
    private String content;
    private MediaResponse media;
    private TtsResponse voice;
}