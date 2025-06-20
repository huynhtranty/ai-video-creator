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
        // Convert the Voice object to a VoiceEntity and save it
        VoiceEntity voiceEntity = VoiceMapper.toJpaVoiceEntity(voice);
        voiceJpaRepository.save(voiceEntity);
    }

    @Override
    public Optional<Voice> findVoiceById(UUID id) {
        // Implementation for finding a voice by ID
        return Optional.empty();
    }

    @Override
    public List<Voice> findAllVoices() {
        // Implementation for finding all voices
        return new ArrayList<>();
    }

    @Override
    public void deleteVoiceById(UUID id) {
        // Implementation for deleting a voice by ID
    }

    @Override
    public boolean existsById(UUID id) {
        // Implementation to check if a voice exists by ID
        return false;
    }


}
