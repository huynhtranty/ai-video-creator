package com.hcmus.softdes.aivideocreator.api.controllers;

import com.hcmus.softdes.aivideocreator.application.service.TopicService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/topic")
public class TopicController {

    private final TopicService trendingService;

    public TopicController(TopicService trendingService) {
        this.trendingService = trendingService;
    }

    @GetMapping
    public ResponseEntity<String> getTrending() {
        return ResponseEntity.ok(trendingService.execute());
    }
}

