package com.hcmus.softdes.aivideocreator.api.controllers;

import com.hcmus.softdes.aivideocreator.api.contracts.contents.ContentRequest;
import com.hcmus.softdes.aivideocreator.api.contracts.contents.ImageRequest;
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
    public String generateScript(@RequestBody ContentRequest request) {
        return contentService.generateScript(new ScriptRequest(request.prompt(), "gemini", "")).content();
    }

    @PostMapping(value = "/image")
    public String generateImage(@RequestBody ImageRequest request) {
        return "";
    }

}
