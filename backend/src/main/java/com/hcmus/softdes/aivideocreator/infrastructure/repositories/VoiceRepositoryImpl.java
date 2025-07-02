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
import javax.sound.sampled.*;
import java.io.*;
import com.mpatric.mp3agic.Mp3File;

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
        List<VoiceEntity> voiceEntities = voiceJpaRepository.findByProjectId(projectId);
        List<Voice> voices = new ArrayList<>();
        for (VoiceEntity entity : voiceEntities) {
            voices.add(VoiceMapper.toDomainVoice(entity));
        }
        return voices;
    }

    @Override
    public int getMp3Duration(byte[] audioBytes) {
        try {
            File tempFile = File.createTempFile("temp-audio", ".mp3");
            try (FileOutputStream fos = new FileOutputStream(tempFile)) {
                fos.write(audioBytes);
            }
            Mp3File mp3File = new Mp3File(tempFile.getAbsolutePath());
            int durationInSeconds = (int) mp3File.getLengthInSeconds();
            tempFile.delete();
            return durationInSeconds;
        } catch (Exception e) {
            return -1; // Handle errors appropriately
        }
    }
}