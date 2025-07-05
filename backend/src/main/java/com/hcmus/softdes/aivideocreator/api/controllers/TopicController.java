package com.hcmus.softdes.aivideocreator.api.controllers;

import com.hcmus.softdes.aivideocreator.application.dto.topic.TopicResponse;
import com.hcmus.softdes.aivideocreator.application.service.TopicService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/topic")
public class TopicController {

    private final TopicService trendingService;

    public TopicController(TopicService trendingService) {
        this.trendingService = trendingService;
    }


    @GetMapping("/summary")
    public ResponseEntity<TopicResponse> getSummary(
            @RequestParam String keyword,
            @RequestParam(defaultValue = "3") int lines) {
        String summary = trendingService.execute(keyword, lines);
        return ResponseEntity.ok(new TopicResponse(summary));
    }

    @GetMapping("/trending")
    public ResponseEntity<List<String>> getTrendingTopics() {
        List<String> trendingTopics = trendingService.getTrendingTopics();
        return ResponseEntity.ok(trendingTopics);
    }
}

