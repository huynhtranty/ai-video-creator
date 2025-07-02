package com.hcmus.softdes.aivideocreator.application.service;

import com.hcmus.softdes.aivideocreator.domain.model.TrendingTopic;
import com.hcmus.softdes.aivideocreator.infrastructure.external.trending.GoogleTrendsGateway;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TrendingService {
    private final GoogleTrendsGateway googleTrendsGateway;

    public TrendingService(GoogleTrendsGateway googleTrendsGateway) {
        this.googleTrendsGateway = googleTrendsGateway;
    }

    public List<TrendingTopic> execute() {
        return googleTrendsGateway.fetchTrendingTopics();
    }
}
