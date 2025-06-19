package com.hcmus.softdes.aivideocreator.api.controllers;

import com.hcmus.softdes.aivideocreator.application.dto.voice.TtsRequest;
import com.hcmus.softdes.aivideocreator.application.dto.voice.TtsResponse;
import com.hcmus.softdes.aivideocreator.application.service.VoiceService;
import com.hcmus.softdes.aivideocreator.domain.model.Voice;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
}
