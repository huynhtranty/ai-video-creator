package com.hcmus.softdes.aivideocreator.infrastructure.mapper;

import com.hcmus.softdes.aivideocreator.domain.model.Script;
import com.hcmus.softdes.aivideocreator.infrastructure.entity.ScriptEntity;

public class ScriptMapper {
     public static ScriptEntity toJpaEntity(Script script) {
         if (script == null) {
             return null;
         }
         return ScriptEntity.builder()
                 .id(script.getId())
                 .scriptContent(script.getContent())
                 .projectId(script.getProjectId())
                 .creationDate(script.getCreatedAt())
                 .lastModified(script.getUpdatedAt())
                 .build();
     }

    public static Script toDomainEntity(ScriptEntity jpaEntity) {
         if (jpaEntity == null) {
             return null;
         }
         return Script.builder()
                 .id(jpaEntity.getId())
                 .content(jpaEntity.getScriptContent())
                 .projectId(jpaEntity.getProjectId())
                 .createdAt(jpaEntity.getCreationDate())
                 .updatedAt(jpaEntity.getLastModified())
                 .build();
     }
}
