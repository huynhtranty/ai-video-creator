package com.hcmus.softdes.aivideocreator.application.dto.content;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.hcmus.softdes.aivideocreator.domain.model.Script;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class ScriptLayout {
    String context;
    String language;
    List<Script> scripts;
}
