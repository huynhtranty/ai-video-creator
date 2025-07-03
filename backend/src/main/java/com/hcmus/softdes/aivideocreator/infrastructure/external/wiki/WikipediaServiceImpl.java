package com.hcmus.softdes.aivideocreator.infrastructure.external.wiki;

import com.hcmus.softdes.aivideocreator.api.services.LanguageUtil;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriUtils;
import java.nio.charset.StandardCharsets;
import java.util.Map;
import java.net.URLDecoder;

@Service
public class WikipediaServiceImpl implements WikipediaService {
    private final RestTemplate restTemplate = new RestTemplate();



    @Override
    public String getShortSummary(String keyword, int lines) {
        String langCode = LanguageUtil.detectWikipediaDomain(keyword);
        String url = "https://" + langCode + ".wikipedia.org/api/rest_v1/page/summary/" + keyword;

        Map response = restTemplate.getForObject(url, Map.class);
        if (response == null || response.get("extract") == null) return null;
        String extract = (String) response.get("extract");

        String[] sentences = extract.split("(?<=\\.) ");
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < Math.min(lines, sentences.length); i++) {
            sb.append(sentences[i]);
            if (i < lines - 1) sb.append(" ");
        }
        return sb.toString().trim();
    }
}