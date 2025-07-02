package com.hcmus.softdes.aivideocreator.infrastructure.external.script;

import com.hcmus.softdes.aivideocreator.application.dto.content.ScriptRequest;

public interface ScriptGenerationService {
    String generateScript(String prompt);
}
