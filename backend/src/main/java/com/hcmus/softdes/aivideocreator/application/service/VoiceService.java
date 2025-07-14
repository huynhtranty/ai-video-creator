package com.hcmus.softdes.aivideocreator.application.service;

import com.hcmus.softdes.aivideocreator.application.common.repositories.ScriptRepository;
import com.hcmus.softdes.aivideocreator.application.common.repositories.VoiceRepository;
import com.hcmus.softdes.aivideocreator.application.dto.voice.TtsRequest;
import com.hcmus.softdes.aivideocreator.application.dto.voice.TtsResponse;
import com.hcmus.softdes.aivideocreator.domain.model.Voice;
import com.hcmus.softdes.aivideocreator.infrastructure.external.audio.TtsService;
import com.hcmus.softdes.aivideocreator.infrastructure.external.r2storage.R2Service;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class VoiceService {
    private final Map<String, TtsService> ttsProviders;
    private final R2Service r2StorageService;
    private final VoiceRepository voiceRepository;
    private final ScriptRepository scriptRepository;

    public VoiceService(List<TtsService> services,
                        R2Service r2StorageService,
                        VoiceRepository voiceRepository, ScriptRepository scriptRepository) {
        this.ttsProviders = services.stream().collect(Collectors.toMap(s -> s.getClass().getAnnotation(Service.class).value(), s -> s));
        this.r2StorageService = r2StorageService;
        this.voiceRepository = voiceRepository;
        this.scriptRepository = scriptRepository;
    }

    public TtsResponse handle(TtsRequest request) {
        var providerKey = request.getProvider();
        TtsService provider = ttsProviders.get(providerKey);
        if (provider == null) throw new RuntimeException("TTS provider not supported");

        byte[] audio = provider.synthesize(request);
        int duration = voiceRepository.getMp3Duration(audio);
        String filename = "voice-" +  System.currentTimeMillis() + ".mp3";
        String url = r2StorageService.uploadFile(filename, audio, "audio/mpeg");

        UUID projectId;
        UUID scriptId;
        try {
            projectId = UUID.fromString(request.getProjectId());
            scriptId = request.getScriptId() != null ? UUID.fromString(request.getScriptId()) : null;
        } catch (IllegalArgumentException e) {
            throw new RuntimeException("Invalid projectId: must be a valid UUID", e);
        }
        Voice record = Voice.create(
            request.getText(),
            request.getLanguageCode(),
            providerKey,
            duration,
            url,
            request.getGender(),
            filename,
            scriptId,
            projectId,
            request.getSpeakingRate());
        voiceRepository.saveVoice(record);

        return new TtsResponse(url, "mp3", duration, request.getProjectId());
    }

    @Transactional
    public TtsResponse uploadMp3File(
        MultipartFile file,
        String projectId,
        String scriptId
    ) {
        if (file == null || file.isEmpty() || !file.getOriginalFilename().endsWith(".mp3")) {
            throw new RuntimeException("Invalid file. Please upload an mp3 file.");
        }

        UUID projectUuid;
        UUID scriptUuid;
        try {
            projectUuid = java.util.UUID.fromString(projectId);
            scriptUuid = java.util.UUID.fromString(scriptId);
        } catch (IllegalArgumentException e) {
            throw new RuntimeException("Invalid projectId: must be a valid UUID", e);
        }

        voiceRepository.deleteVoiceByScriptId(scriptUuid);
        var script = scriptRepository.findScriptById(scriptUuid);

        byte[] audio;
        try {
            audio = file.getBytes();
        }
        catch (Exception e) {
            throw new RuntimeException("Failed to read the uploaded file", e);
        }

        int duration = voiceRepository.getMp3Duration(audio);
        String filename = "voice-" + System.currentTimeMillis() + "-" + file.getOriginalFilename();
        String url = r2StorageService.uploadFile(filename, audio, "audio/mpeg");

        Voice record = Voice.create(
                script.getContent(),
                null,
                null,
                duration,
                url,
                null,
                filename,
                scriptUuid,
                projectUuid);
        voiceRepository.saveVoice(record);

        return new TtsResponse(url, "mp3", duration, projectId);
    }

    public void deleteVoice(String voiceId) {
        Voice voice = voiceRepository.findVoiceById(UUID.fromString(voiceId))
                .orElseThrow(() -> new RuntimeException("Voice not found with id: " + voiceId));

        r2StorageService.deleteFile(voice.getFilename());
        voiceRepository.deleteVoiceById(UUID.fromString(voiceId));
    }

    @Transactional
    public TtsResponse regenerateVoice(String scriptId, String provider, String gender, String language, double speechRate) {
        if (scriptId == null || provider == null) {
            throw new RuntimeException("Script ID and provider cannot be null");
        }

        UUID scriptUuid;
        try {
            scriptUuid = UUID.fromString(scriptId);
        } catch (IllegalArgumentException e) {
            throw new RuntimeException("Invalid scriptId: must be a valid UUID", e);
        }

        Voice existingVoice = voiceRepository.findVoiceByScriptId(scriptUuid);

        TtsRequest request = new TtsRequest(
            existingVoice.getText(),
            provider,
            (language == null || "".equals(language)) ? existingVoice.getLanguageCode() : language,
            speechRate <= 0 ? existingVoice.getSpeakingRate() : speechRate,
            (gender == null || "".equals(gender)) ? existingVoice.getVoiceGender() : gender,
            existingVoice.getProjectId().toString(),
            scriptId
        );

        voiceRepository.deleteVoiceByScriptId(scriptUuid);

        TtsService providerService = ttsProviders.get(provider);
        if (providerService == null) {
            throw new RuntimeException("TTS provider not supported");
        }
        byte[] audio = providerService.synthesize(request);
        int duration = voiceRepository.getMp3Duration(audio);
        String filename = "voice-" + System.currentTimeMillis() + ".mp3";
        String url = r2StorageService.uploadFile(filename, audio, "audio/mpeg");

        Voice newVoice = Voice.create(
            request.getText(),
            request.getLanguageCode(),
            provider,
            duration,
            url,
            request.getGender(),
            filename,
            scriptUuid,
            UUID.fromString(request.getProjectId()),
            request.getSpeakingRate()
        );
        voiceRepository.saveVoice(newVoice);
        return new TtsResponse(url, "mp3", duration, request.getProjectId());
    }
}
