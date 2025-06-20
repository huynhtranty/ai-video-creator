package com.hcmus.softdes.aivideocreator.api.controllers;

import com.hcmus.softdes.aivideocreator.application.dto.voice.TtsRequest;
import com.hcmus.softdes.aivideocreator.application.dto.voice.TtsResponse;
import com.hcmus.softdes.aivideocreator.application.service.VoiceService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/tts")
public class VoiceController {
    private final VoiceService voiceService;
    public VoiceController(VoiceService voiceService) {
        this.voiceService = voiceService;
    }

    @PostMapping
    public ResponseEntity<TtsResponse> synthesizeVoice(@RequestBody TtsRequest request){
        TtsResponse response = voiceService.handle(request);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/upload")
    public ResponseEntity<TtsResponse> uploadMp3(
            @RequestParam("file") MultipartFile file,
            @RequestParam("projectId") String projectId,
            @RequestParam("languageCode") String languageCode,
            @RequestParam("provider") String provider
    ) {
        TtsResponse response = voiceService.uploadMp3File(file, projectId, languageCode, provider);
        return ResponseEntity.ok(response);
    }
}
