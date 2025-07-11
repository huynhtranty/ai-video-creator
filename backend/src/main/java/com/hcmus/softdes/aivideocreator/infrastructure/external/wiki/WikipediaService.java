package com.hcmus.softdes.aivideocreator.infrastructure.external.wiki;

import com.hcmus.softdes.aivideocreator.domain.model.TopicWiki;

import java.util.List;

public interface WikipediaService {
    public String getShortSummary(String keyword, int lines);
}
