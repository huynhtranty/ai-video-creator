package com.hcmus.softdes.aivideocreator.api.mappers;

import com.hcmus.softdes.aivideocreator.api.contracts.contents.ScriptLayoutResponse;
import com.hcmus.softdes.aivideocreator.api.contracts.contents.ScriptResponse;
import com.hcmus.softdes.aivideocreator.application.dto.content.ScriptLayout;
import com.hcmus.softdes.aivideocreator.domain.model.Script;

public class ContentMapper {

    public static ScriptResponse toScriptResponse(Script script) {
        return ScriptResponse.builder()
                .id(script.getId().toString())
                .content(script.getContent())
                .projectId(script.getProjectId().toString())
                .order(script.getOrder())
                .build();
    }

    public static ScriptLayoutResponse toScriptLayoutResponse(ScriptLayout scriptLayout) {
        ScriptResponse[] scriptResponses = scriptLayout.getScripts().stream()
                .map(ContentMapper::toScriptResponse)
                .toArray(ScriptResponse[]::new);

        return ScriptLayoutResponse.builder()
                .context(scriptLayout.getContext())
                .language(scriptLayout.getLanguage())
                .scripts(scriptResponses)
                .build();
    }
}
