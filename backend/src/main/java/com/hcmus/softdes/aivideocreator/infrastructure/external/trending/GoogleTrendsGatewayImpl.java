package com.hcmus.softdes.aivideocreator.infrastructure.external.trending;

import com.fasterxml.jackson.databind.JsonNode;
import com.hcmus.softdes.aivideocreator.domain.model.TrendingTopic;
import org.springframework.http.*;
import org.springframework.stereotype.Repository;
import org.springframework.web.client.RestTemplate;

import java.util.*;

@Repository
public class GoogleTrendsGatewayImpl implements GoogleTrendsGateway {

    private final RestTemplate restTemplate;
    private final String apiKey = "c30a353f80mshef2cca0a9b169f3p17bcc2jsncfc974e7ad75";

    public GoogleTrendsGatewayImpl(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    @Override
    public List<TrendingTopic> fetchTrendingTopics() {
        String url = "https://google-trends-api5.p.rapidapi.com/api/v1/trends";

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("x-rapidapi-host", "google-trends-api5.p.rapidapi.com");
        headers.set("x-rapidapi-key", apiKey);

        Map<String, Object> body = new HashMap<>();
        body.put("geo", "GB");
        body.put("hours", "48");
        body.put("sort", "title");

        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(body, headers);

        ResponseEntity<JsonNode> response = restTemplate.exchange(
                url,
                HttpMethod.POST,
                entity,
                JsonNode.class
        );

        List<TrendingTopic> results = new ArrayList<>();
        JsonNode items = response.getBody().get("trends");
        if (items != null && items.isArray()) {
            for (JsonNode item : items) {
                String title = item.get("title").asText();
                String snippet = item.has("snippet") ? item.get("snippet").asText() : "";
                int popularityScore = item.has("popularityScore") ? item.get("popularityScore").asInt() : 0;
                results.add(TrendingTopic.create(title, snippet, popularityScore));
            }
        }
        return results;
    }
}