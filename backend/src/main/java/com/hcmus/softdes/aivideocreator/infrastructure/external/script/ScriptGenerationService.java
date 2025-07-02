package com.hcmus.softdes.aivideocreator.infrastructure.external.script;

import com.hcmus.softdes.aivideocreator.api.contracts.contents.ContentRequest;

public interface ScriptGenerationService {
    String generateScript(ContentRequest request);
}
