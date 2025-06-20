package com.hcmus.softdes.aivideocreator.infrastructure.repositories;

import com.hcmus.softdes.aivideocreator.application.common.repositories.VoiceRepository;
import com.hcmus.softdes.aivideocreator.domain.model.Voice;
import com.hcmus.softdes.aivideocreator.infrastructure.entity.VoiceEntity;
import com.hcmus.softdes.aivideocreator.infrastructure.jpa.VoiceJpaRepository;
import com.hcmus.softdes.aivideocreator.infrastructure.mapper.VoiceMapper;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public class VoiceRepositoryImpl implements VoiceRepository {

    private final VoiceJpaRepository voiceJpaRepository;

    public VoiceRepositoryImpl(VoiceJpaRepository voiceJpaRepository) {
        this.voiceJpaRepository = voiceJpaRepository;
    }

    @Override
    public void saveVoice(Voice voice) {
        VoiceEntity voiceEntity = VoiceMapper.toJpaVoiceEntity(voice);
        voiceJpaRepository.save(voiceEntity);
    }

    @Override
    public Optional<Voice> findVoiceById(UUID id) {
        Optional<VoiceEntity> voiceEntityOptional = voiceJpaRepository.findById(id);
        if (voiceEntityOptional.isPresent()) {
            Voice voice = VoiceMapper.toDomainVoice(voiceEntityOptional.get());
            return Optional.of(voice);
        }
        return Optional.empty();
    }

    @Override
    public List<Voice> findAllVoices() {
        // Implementation for finding all voices
        return new ArrayList<>();
    }

    @Override
    public void deleteVoiceById(UUID id) {
        voiceJpaRepository.deleteById(id);
    }

    @Override
    public boolean existsById(UUID id) {
        // Implementation to check if a voice exists by ID
        return false;
    }

    @Override
    public List<Voice> findVoicesByProjectId(UUID projectId) {
    // Implementation for finding voices by project ID
        List<VoiceEntity> voiceEntities = voiceJpaRepository.findByProjectId(projectId);
        // Convert the list of VoiceEntity to a list of Voice
        List<Voice> voices = new ArrayList<>();
        for (VoiceEntity entity : voiceEntities) {
            voices.add(VoiceMapper.toDomainVoice(entity));
        }
        // Return the list of Voice objects
        return voices;
    }


}
