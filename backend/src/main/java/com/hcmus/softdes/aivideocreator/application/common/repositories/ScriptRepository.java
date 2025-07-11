package com.hcmus.softdes.aivideocreator.application.common.repositories;

import com.hcmus.softdes.aivideocreator.domain.model.Script;

import java.util.List;
import java.util.UUID;

public interface ScriptRepository {
    List<Script> findAllScripts();
    void saveScript(Script script);
    Script findScriptById(UUID script);
    void deleteScriptById(UUID scriptId);
    List<Script> findScriptsByProjectId(UUID projectId);
    void updateScript(Script script);
}
