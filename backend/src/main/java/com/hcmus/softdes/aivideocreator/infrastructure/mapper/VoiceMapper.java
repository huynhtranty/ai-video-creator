package com.hcmus.softdes.aivideocreator.infrastructure.mapper;

import com.hcmus.softdes.aivideocreator.infrastructure.entity.VoiceEntity;

public class VoiceMapper {

    public VoiceEntity toJpaVoiceEntity(com.hcmus.softdes.aivideocreator.domain.model.Voice voice) {
        if (voice == null) {
            return null;
        }
        return VoiceEntity.builder()
                .id(voice.getId())
                .provider(voice.getProvider())
                .projectId(voice.getProjectId())
                .creationDate(voice.getCreatedAt())
                .build();
    }

    public com.hcmus.softdes.aivideocreator.domain.model.Voice toDomainVoice(VoiceEntity jpaEntity) {
        if (jpaEntity == null) {
            return null;
        }

        return com.hcmus.softdes.aivideocreator.domain.model.Voice.builder()
                .id(jpaEntity.getId())
                .provider(jpaEntity.getProvider())
                .projectId(jpaEntity.getProjectId())
                .createdAt(jpaEntity.getCreationDate())
                .build();
    }
}
