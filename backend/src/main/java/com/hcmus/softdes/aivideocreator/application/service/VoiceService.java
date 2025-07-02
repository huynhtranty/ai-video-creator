package com.hcmus.softdes.aivideocreator.application.service;

import com.hcmus.softdes.aivideocreator.application.common.repositories.VoiceRepository;
import com.hcmus.softdes.aivideocreator.application.dto.voice.TtsRequest;
import com.hcmus.softdes.aivideocreator.application.dto.voice.TtsResponse;
import com.hcmus.softdes.aivideocreator.domain.model.Voice;
import com.hcmus.softdes.aivideocreator.infrastructure.external.audio.TtsService;
import com.hcmus.softdes.aivideocreator.infrastructure.external.r2storage.R2Service;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class VoiceService {
    private final Map<String, TtsService> ttsProviders;
    private final R2Service r2StorageService;
    private final VoiceRepository repository;

    public VoiceService(List<TtsService> services,
                                 R2Service r2StorageService,
                                 VoiceRepository repository) {
        this.ttsProviders = services.stream().collect(Collectors.toMap(s -> s.getClass().getAnnotation(Service.class).value(), s -> s));
        this.r2StorageService = r2StorageService;
        this.repository = repository;
    }

    public TtsResponse handle(TtsRequest request) {
        var providerKey = request.getProvider().toLowerCase();
        TtsService provider = ttsProviders.get(providerKey);
        if (provider == null) throw new RuntimeException("TTS provider not supported");

        byte[] audio = provider.synthesize(request);
        int duration = repository.getMp3Duration(audio);
        String filename = UUID.randomUUID() + ".mp3";
        String url = r2StorageService.uploadFile(filename, audio, "audio/mpeg");

        UUID projectId;
        try {
            projectId = UUID.fromString(request.getProjectId());
        } catch (IllegalArgumentException e) {
            throw new RuntimeException("Invalid projectId: must be a valid UUID", e);
        }
        Voice record = Voice.create(request.getText(), request.getLanguageCode() ,providerKey,duration, request.getGender(), url, projectId);
        repository.saveVoice(record);

        return new TtsResponse(url, "mp3", duration, request.getProjectId());
    }

    public TtsResponse uploadMp3File(MultipartFile file, String projectId, String languageCode, String provider) {
        if (file == null || file.isEmpty() || !file.getOriginalFilename().endsWith(".mp3")) {
            throw new RuntimeException("Invalid file. Please upload an mp3 file.");
        }
        try {
            byte[] audio = file.getBytes();
            int duration = repository.getMp3Duration(audio);
            String filename = java.util.UUID.randomUUID() + ".mp3";
            String url = r2StorageService.uploadFile(filename, audio, "audio/mpeg");

            java.util.UUID projectUuid;
            try {
                projectUuid = java.util.UUID.fromString(projectId);
            } catch (IllegalArgumentException e) {
                throw new RuntimeException("Invalid projectId: must be a valid UUID", e);
            }
            Voice record = Voice.create(file.getOriginalFilename(), languageCode, provider.toLowerCase(),duration, "MALE", url, projectUuid);
            repository.saveVoice(record);

            return new TtsResponse(url, "mp3", duration, projectId);
        } catch (Exception e) {
            throw new RuntimeException("Failed to upload file", e);
        }
    }

    public void deleteVoice(String voiceId) {
        Voice voice = repository.findVoiceById(UUID.fromString(voiceId))
                .orElseThrow(() -> new RuntimeException("Voice not found with id: " + voiceId));

        r2StorageService.deleteFile(voice.getUrl());
        repository.deleteVoiceById(UUID.fromString(voiceId));
    }
}
