package com.hcmus.softdes.aivideocreator.infrastructure.external.trending;

import com.hcmus.softdes.aivideocreator.domain.model.TrendingTopic;

import java.util.List;

public interface GoogleTrendsGateway {
    List<TrendingTopic> fetchTrendingTopics();
}
