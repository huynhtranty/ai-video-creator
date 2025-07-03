package com.hcmus.softdes.aivideocreator.application.service;

import com.hcmus.softdes.aivideocreator.domain.model.TopicWiki;
import com.hcmus.softdes.aivideocreator.infrastructure.external.wiki.WikipediaService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TopicService {
    private final WikipediaService fetchTopics;

    public TopicService(WikipediaService wikipediaService) {
        this.fetchTopics = wikipediaService;
    }

    public String execute() {
        return fetchTopics.getShortSummary("Bạch Tuyết", 5);
    }
}
