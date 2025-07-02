package com.hcmus.softdes.aivideocreator.api.controllers;

import com.hcmus.softdes.aivideocreator.application.dto.content.ImageRequest;
import com.hcmus.softdes.aivideocreator.application.dto.content.ImageResponse;
import com.hcmus.softdes.aivideocreator.application.dto.content.ScriptRequest;
import com.hcmus.softdes.aivideocreator.application.dto.content.ScriptResponse;
import com.hcmus.softdes.aivideocreator.application.service.ContentService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/contents")
public class ContentController {
    private final ContentService contentService;

    public ContentController(ContentService contentService) {
        this.contentService = contentService;
    }

    @PostMapping("/script")
    public ResponseEntity<ScriptResponse> generateScript(@RequestBody ScriptRequest request) {
        var response = contentService.generateScript(request);
        return ResponseEntity.ok(response);
    }

    @PostMapping(value = "/image")
    public ResponseEntity<ImageResponse> generateImage(@RequestBody ImageRequest request) {
        var response = contentService.generateImage(request);
        return ResponseEntity.ok(response);
    }

}
