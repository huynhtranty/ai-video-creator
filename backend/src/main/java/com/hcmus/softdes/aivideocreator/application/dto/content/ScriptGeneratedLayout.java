package com.hcmus.softdes.aivideocreator.application.dto.content;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Data;
import lombok.extern.jackson.Jacksonized;

import java.util.List;

@Data
@Builder
@Jacksonized
public class ScriptGeneratedLayout {
    @JsonProperty("context")
    String context;
    
    @JsonProperty("language_code")
    String languageCode;
    
    @JsonProperty("scripts")
    List<String> scripts;
}
