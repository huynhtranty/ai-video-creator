package com.hcmus.softdes.aivideocreator.infrastructure.external.script;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.common.collect.ImmutableMap;
import com.google.genai.Client;
import com.google.genai.types.*;
import com.hcmus.softdes.aivideocreator.application.dto.content.ScriptGeneratedLayout;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service("gemini-script")
public class GeminiScriptGenerationService implements ScriptGenerationService {
    private final String SCRIPT_MODEL_ID = "gemini-2.5-flash";
    private final ObjectMapper objectMapper = new ObjectMapper();
    
    @Value("${gemini.api.key}")
    private String apiKey;

    @Override
    public ScriptGeneratedLayout generateScript(String prompt) {
        Client client = Client.builder().apiKey(apiKey).build();

        Schema contentSchema = Schema.builder()
            .type(Type.Known.OBJECT)
            .properties(
                ImmutableMap.of(
                    "language_code", Schema.builder()
                        .type(Type.Known.STRING)
                        .description("The language code of the content")
                        .build(),
                    "context", Schema.builder()
                        .type(Type.Known.STRING)
                        .description("The context of the content")
                        .build(),
                    "scripts", Schema.builder()
                        .type(Type.Known.ARRAY)
                        .items(Schema.builder().type(Type.Known.STRING)
                        )
                        .description("List of contents")
                        .build()
                )
            )
            .required("context", "scripts", "language_code")
            .build();

        GenerateContentConfig config = GenerateContentConfig.builder()
            .temperature(1.6f)
            .responseMimeType("application/json")
            .candidateCount(1)
            .responseSchema(contentSchema)
            .build();

        String systemPrompt =
            """
            Create a context, a list of scripts and a language code from a topic.
            
            ###
            
            Detect the language code of the topic.
            
            ###
            
            Generate a vivid, reusable visual context for a short cinematic sequence. 
            The setting should include a distinct location, time period, mood, and aesthetic style. 
            Ensure the scene includes persistent environmental details (e.g., lighting, architecture, weather), 
            character types, and visual motifs that can remain consistent across multiple frames. 
            The context should be concise (under 300 words) 
            and suitable for guiding image generation for a storyboard or animated video.
            The context should include any description of any characters that are relevant to the topic.
            
            ###
            
            Generate 4–10 script paragraphs (more if needed), where each describes **a single scene**.
            
            Each script paragraph should:
            - Be written for spoken narration.
            - Be vivid, clear, concise, and scene-focused.
            - Avoid mentioning visuals do not describe the art style, camera moves, colors, or characters' physical details.
             The narrative should flow logically: include an introduction, key points, and a meaningful conclusion.
            
            Topic:
            """ + prompt;

        GenerateContentResponse response = client.models.generateContent(SCRIPT_MODEL_ID, systemPrompt, config);

        try {
            return objectMapper.readValue(response.text(), ScriptGeneratedLayout.class);
        } catch (Exception e) {
            throw new RuntimeException("Failed to parse script generation response", e);
        }
    }

    @Override
    public String regenerateScript(String content) {
        Client client = Client.builder().apiKey(apiKey).build();

        GenerateContentConfig config = GenerateContentConfig.builder()
            .responseMimeType("text/plain")
            .candidateCount(1)
            .build();

        String systemPrompt = """
            Rewrite the paragraph in another way but still have the same meaning.
            Only response the rewritten version of the paragraph.
            The written version should be concise, clear, and vivid and shouldn't be much longer than the original one.
            
            Paragraph:
            """
            + content
            + "The rewritten version:";

        GenerateContentResponse response = client.models.generateContent(SCRIPT_MODEL_ID, systemPrompt, config);

        return response.text();
    }
}
