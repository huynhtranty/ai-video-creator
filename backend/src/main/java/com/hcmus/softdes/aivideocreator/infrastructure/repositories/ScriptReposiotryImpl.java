package com.hcmus.softdes.aivideocreator.infrastructure.repositories;

import com.hcmus.softdes.aivideocreator.application.common.repositories.ScriptRepository;
import com.hcmus.softdes.aivideocreator.domain.model.Script;
import com.hcmus.softdes.aivideocreator.infrastructure.entity.ScriptEntity;
import com.hcmus.softdes.aivideocreator.infrastructure.jpa.ScriptJpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;


@Repository
public class ScriptReposiotryImpl implements ScriptRepository {
    ScriptJpaRepository scriptJpaRepository;

    public ScriptReposiotryImpl(ScriptJpaRepository scriptJpaRepository) {
        this.scriptJpaRepository = scriptJpaRepository;
    }


    // Implement methods from ScriptRepository interface
    // For example:
    // @Override
     public List<Script> findAllScripts() {
         // Implementation logic here
         return null;
     }

     @Override
     public void saveScript(Script script) {
         // Implementation logic here
     }

     @Override
     public Script findScriptById(UUID scriptId) {
         // Implementation logic here
         return null;
     }
}
