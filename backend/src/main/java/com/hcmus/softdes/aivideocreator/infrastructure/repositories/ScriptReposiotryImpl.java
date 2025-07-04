package com.hcmus.softdes.aivideocreator.infrastructure.repositories;

import com.hcmus.softdes.aivideocreator.application.common.repositories.ScriptRepository;
import com.hcmus.softdes.aivideocreator.domain.model.Script;
import com.hcmus.softdes.aivideocreator.infrastructure.entity.ScriptEntity;
import com.hcmus.softdes.aivideocreator.infrastructure.jpa.ScriptJpaRepository;
import com.hcmus.softdes.aivideocreator.infrastructure.mapper.ScriptMapper;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;


@Repository
public class ScriptReposiotryImpl implements ScriptRepository {
    ScriptJpaRepository scriptJpaRepository;

    public ScriptReposiotryImpl(ScriptJpaRepository scriptJpaRepository) {
        this.scriptJpaRepository = scriptJpaRepository;
    }

     @Override
     public List<Script> findAllScripts() {
         List<ScriptEntity> scriptEntities = scriptJpaRepository.findAll();
         if (!scriptEntities.isEmpty()) {
             return scriptEntities.stream()
                     .map(ScriptMapper::toDomainEntity)
                     .toList();
         } else {
             return List.of();
         }
     }

     @Override
     public void saveScript(Script script) {
          ScriptEntity scriptEntity = ScriptMapper.toJpaEntity(script);
          scriptJpaRepository.save(scriptEntity);
     }

     @Override
     public Script findScriptById(UUID scriptId) {
            return scriptJpaRepository.findById(scriptId)
                    .map(ScriptMapper::toDomainEntity)
                    .orElse(null);
     }

    @Override
    public void deleteScriptById(UUID scriptId) {
        scriptJpaRepository.deleteById(scriptId);
    }

    @Override
    public void updateScript(Script script) {
        ScriptEntity scriptEntity = ScriptMapper.toJpaEntity(script);
        UUID scriptId = scriptEntity.getId();
        if (scriptJpaRepository.existsById(scriptId)) {
            scriptJpaRepository.save(scriptEntity);
        } else {
            throw new IllegalArgumentException("Script with ID " + scriptId + " does not exist.");
        }
    }

    @Override
        public List<Script> findScriptsByProjectId(UUID projectId) {
            List<ScriptEntity> scriptEntities = scriptJpaRepository.findByProjectIdOrderByOrderAsc(projectId);
            if (scriptEntities != null && !scriptEntities.isEmpty()) {
                return scriptEntities.stream()
                        .map(ScriptMapper::toDomainEntity)
                        .toList();
            } else {
                return List.of();
            }
        }
}
