package com.hcmus.softdes.aivideocreator.infrastructure.external.script;

import com.hcmus.softdes.aivideocreator.application.dto.content.ScriptGeneratedLayout;

public interface ScriptGenerationService {
    ScriptGeneratedLayout generateScript(String prompt);
    String regenerateScript(String context, String content);
}
