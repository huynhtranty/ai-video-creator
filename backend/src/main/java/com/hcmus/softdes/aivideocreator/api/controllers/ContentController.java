package com.hcmus.softdes.aivideocreator.api.controllers;

import com.hcmus.softdes.aivideocreator.api.contracts.contents.ScriptLayoutResponse;
import com.hcmus.softdes.aivideocreator.api.mappers.ContentMapper;
import com.hcmus.softdes.aivideocreator.application.dto.content.ImageRequest;
import com.hcmus.softdes.aivideocreator.application.dto.content.ImageResponse;
import com.hcmus.softdes.aivideocreator.application.dto.content.ScriptGeneratedLayout;
import com.hcmus.softdes.aivideocreator.application.dto.content.ScriptRequest;
import com.hcmus.softdes.aivideocreator.application.dto.voice.TtsRequest;
import com.hcmus.softdes.aivideocreator.application.dto.voice.TtsResponse;
import com.hcmus.softdes.aivideocreator.application.service.ContentService;
import com.hcmus.softdes.aivideocreator.application.service.VoiceService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/contents")
public class ContentController {
    private final ContentService contentService;
    private final VoiceService voiceService;

    public ContentController(ContentService contentService, VoiceService voiceService) {
        this.contentService = contentService;
        this.voiceService = voiceService;
    }

    @PostMapping("/script/generate")
    public ResponseEntity<ScriptLayoutResponse> generateScript(@RequestBody ScriptRequest request) {
        var scriptLayout = contentService.generateScript(request);
        var response = ContentMapper.toScriptLayoutResponse(scriptLayout);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/image/generate")
    public ResponseEntity<ImageResponse> generateImage(@RequestBody ImageRequest request) {
        var response = contentService.generateImage(request);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/voice/generate")
    public ResponseEntity<TtsResponse> synthesizeVoice(@RequestBody TtsRequest request){
        TtsResponse response = voiceService.handle(request);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/voice/upload")
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
