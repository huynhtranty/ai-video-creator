package com.hcmus.softdes.aivideocreator.application.service;

import com.hcmus.softdes.aivideocreator.application.common.repositories.ScriptRepository;
import org.springframework.stereotype.Service;

@Service
public class ScriptService {
    ScriptRepository scriptRepository;
    public ScriptService(ScriptRepository scriptRepository) {
        this.scriptRepository = scriptRepository;
    }

    // Implement methods for script service operations
}
