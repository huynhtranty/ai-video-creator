package com.hcmus.softdes.aivideocreator.api.mappers;

import com.hcmus.softdes.aivideocreator.domain.model.Script;
import com.hcmus.softdes.aivideocreator.domain.model.MediaAsset ;
import com.hcmus.softdes.aivideocreator.domain.model.Voice;
import com.hcmus.softdes.aivideocreator.application.dto.script.ScriptDto;

public class ScriptMapper {

    public static ScriptDto toDto(Script script, MediaAsset media, Voice voice) {
        if (script == null) return null;
        ScriptDto dto = new ScriptDto();
        dto.setId(script.getId());
        dto.setOrder(script.getOrder());
        dto.setContent(script.getContent());
        dto.setMedia(MediaMapper.toDto(media));
        dto.setVoice(VoiceMapper.toDto(voice));
        return dto;
    }
}