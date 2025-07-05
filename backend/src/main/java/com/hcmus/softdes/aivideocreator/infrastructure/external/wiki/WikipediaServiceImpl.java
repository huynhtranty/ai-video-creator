package com.hcmus.softdes.aivideocreator.infrastructure.external.wiki;

import com.hcmus.softdes.aivideocreator.api.services.LanguageUtil;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import java.util.List;
import java.util.Map;

@Service
public class WikipediaServiceImpl implements WikipediaService {
    private final RestTemplate restTemplate = new RestTemplate();

    @Override
    public String getShortSummary(String keyword, int lines) {
        String langCode = LanguageUtil.detectWikipediaDomain(keyword);

        // 1. Search for the keyword
        String searchUrl = "https://" + langCode + ".wikipedia.org/w/api.php?action=query&list=search&srsearch=" + keyword + "&format=json";
        Map searchResponse = restTemplate.getForObject(searchUrl, Map.class);
        if (searchResponse == null) return null;

        Map query = (Map) searchResponse.get("query");
        if (query == null) return null;

        List<Map> searchResults = (List<Map>) query.get("search");
        if (searchResults == null || searchResults.isEmpty()) return null;

        // 2. Check for an exact match
        String title = null;
        for (Map result : searchResults) {
            if (keyword.equalsIgnoreCase((String) result.get("title"))) {
                title = (String) result.get("title");
                break;
            }
        }

        // 3. If no exact match, use the first result
        if (title == null) {
            title = (String) searchResults.get(0).get("title");
        }

        // 4. Fetch the summary for the selected title
        String summaryUrl = "https://" + langCode + ".wikipedia.org/api/rest_v1/page/summary/" + title.replace(" ", "_");
        Map summaryResponse = restTemplate.getForObject(summaryUrl, Map.class);
        if (summaryResponse == null || summaryResponse.get("extract") == null) return null;
        String extract = (String) summaryResponse.get("extract");

        // 5. Return the first N sentences
        String[] sentences = extract.split("(?<=\\.) ");
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < Math.min(lines, sentences.length); i++) {
            sb.append(sentences[i]);
            if (i < lines - 1) sb.append(" ");
        }
        return sb.toString().trim();
    }
}