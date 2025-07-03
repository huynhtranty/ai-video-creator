package com.hcmus.softdes.aivideocreator.infrastructure.external.script;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.hcmus.softdes.aivideocreator.application.dto.content.ScriptLayoutResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

//@Service("llama-script")
/*implements ScriptGenerationService*/
public class CloudflareAIGenerationService{

    @Value("${cloudflare.ai.api-key}")
    private String apiKey;

    private static final String CLOUDFLARE_API_URL =
            "https://api.cloudflare.com/client/v4/accounts/9f3257b84fff2eb2cd583b3ba1a29aa1/ai/run/@cf/meta/llama-3-8b-instruct";

    private final RestTemplate restTemplate = new RestTemplate();
    private final ObjectMapper objectMapper = new ObjectMapper();

//    @Override
    public ScriptLayoutResponse generateScript(String prompt) {
        // Build request headers
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth(apiKey);

        // Build system and user messages
        Map<String, Object> systemMessage = new HashMap<>();
        systemMessage.put("role", "system");
        systemMessage.put("content", "You are a creative director designing a visually cohesive and narratively compelling video. " +
                "Follow the same instructions as the Gemini system prompt for context and script structure.");

        Map<String, Object> userMessage = new HashMap<>();
        userMessage.put("role", "user");
        userMessage.put("content", prompt);

        Map<String, Object> body = new HashMap<>();
        body.put("messages", List.of(systemMessage, userMessage));

        HttpEntity<Map<String, Object>> request = new HttpEntity<>(body, headers);

        ResponseEntity<Map> response = restTemplate.postForEntity(
                CLOUDFLARE_API_URL, request, Map.class);

        // Parse response
        String content = "";
        if (response.getStatusCode() == HttpStatus.OK && response.getBody() != null) {
            Map result = (Map) response.getBody().get("result");
            if (result != null && result.get("response") != null) {
                content = result.get("response").toString();
            }
        }

        try {
            return objectMapper.readValue(content, ScriptLayoutResponse.class);
        } catch (Exception e) {
            throw new RuntimeException("Failed to parse script generation response", e);
        }
    }
}