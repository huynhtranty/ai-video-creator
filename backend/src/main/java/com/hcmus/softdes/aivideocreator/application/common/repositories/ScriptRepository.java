package com.hcmus.softdes.aivideocreator.application.common.repositories;

import com.hcmus.softdes.aivideocreator.domain.model.Script;

import java.util.List;
import java.util.UUID;

public interface ScriptRepository {
    // Define methods for script repository operations
    // For example:
     List<Script> findAllScripts();
     void saveScript(Script script);
     Script findScriptById(UUID script);
}
