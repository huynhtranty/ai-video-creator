package com.hcmus.softdes.aivideocreator.application.common.repositories;

import com.hcmus.softdes.aivideocreator.domain.model.Voice;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface VoiceRepository {
     void saveVoice(Voice voice);
     Optional<Voice> findVoiceById(UUID id);
     List<Voice> findAllVoices();
     void deleteVoiceById(UUID id);
     boolean existsById(UUID id);
     List<Voice> findVoicesByProjectId(UUID projectId);
}
