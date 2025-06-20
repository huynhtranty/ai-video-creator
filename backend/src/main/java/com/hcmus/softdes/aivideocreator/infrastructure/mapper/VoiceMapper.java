package com.hcmus.softdes.aivideocreator.infrastructure.mapper;

import com.hcmus.softdes.aivideocreator.domain.model.Voice;
import com.hcmus.softdes.aivideocreator.infrastructure.entity.VoiceEntity;

public class VoiceMapper {

    public static VoiceEntity toJpaVoiceEntity(Voice voice) {
        if (voice == null) {
            return null;
        }
        return VoiceEntity.builder()
                .id(voice.getId())
                .provider(voice.getProvider())
                .languageCode(voice.getLanguageCode())
                .text(voice.getText())
                .url(voice.getUrl())
                .projectId(voice.getProjectId())
                .creationDate(voice.getCreatedAt())
                .build();
    }

    public static Voice toDomainVoice(VoiceEntity jpaEntity) {
        if (jpaEntity == null) {
            return null;
        }

        return com.hcmus.softdes.aivideocreator.domain.model.Voice.builder()
                .id(jpaEntity.getId())
                .provider(jpaEntity.getProvider())
                .projectId(jpaEntity.getProjectId())
                .createdAt(jpaEntity.getCreationDate())
                .text(jpaEntity.getText())
                .languageCode(jpaEntity.getLanguageCode())
                .url(jpaEntity.getUrl())
                .speakingRate(jpaEntity.getSpeakingRate())
                .build();
    }
}
