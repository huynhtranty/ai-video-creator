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

    private final String SCRIPT_MODEL_ID = "gemini-2.0-flash";
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
                    "language", Schema.builder()
                        .type(Type.Known.STRING)
                        .description("The language of the content")
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
            .required("context", "scripts", "language")
            .build();

        GenerateContentConfig config = GenerateContentConfig.builder()
            .responseMimeType("application/json")
            .candidateCount(1)
            .responseSchema(contentSchema)
            .build();

        String systemPrompt = "Create a video script about this topic: " + prompt +
            """
            .
            **Detect the language of the topic and use the same language throughout all output (context and scripts).**
            
            You are a **creative director** designing a visually cohesive and narratively compelling video. The final output should consist of two parts:
            
            ## Part 1: Visual Context (for consistent and unified illustrated visuals)
            
            Define a **shared visual context** to guide the style of all illustrations or video frames. This visual direction should remain consistent across the entire video.
            
            Include the following:
            
            - **Setting**: Time, place, environment, and weather. (e.g., futuristic Tokyo during a rainstorm at night)
            - **Visual Style**: Art or cinematic direction (e.g., Studio Ghibli, Pixar 3D, Cyberpunk anime, noir).
            - **Color Palette**: Dominant tones and their emotional effects (e.g., cold neon, warm nostalgic pastels).
            - **Characters**: Recurring figures with names (optional), appearances, age, outfit style, key personality traits, expressions.
            - **Tone / Atmosphere**: Emotional journey and thematic tone (e.g., hopeful, tense, melancholic).
            - **Rules of the World**: Any fantastical, sci-fi, or symbolic logic (e.g., flying whales, glowing tattoos as memory keys).
            
            **Important**:
            - This section **must not contain markdown or embedded labels**.
            - This context will be used as the basis for generating a consistent image style across scenes.
            - Do **not** include any scene descriptions or narration here.
            ## Part 2: Video Script (narration for each visual scene)
            
            Generate 4–10 script paragraphs (more if needed), where each describes **a single scene**.
            
            Each script paragraph should:
            - Be written for **spoken narration**.
            - Be **vivid, clear, concise**, and **scene-focused**.
            - Avoid mentioning visuals — **do not describe the art style, camera moves, colors, or characters' physical details**.
            - Not include any markdown, titles, or bullet points.
            - Not include or describe any text or labels in the scene visuals.
            
            The narrative should flow logically: include an introduction, key points, and a meaningful conclusion.
            
            **Language rule reminder**: All output (context and script) must match the detected language of the topic.
            """;

        GenerateContentResponse response = client.models.generateContent(SCRIPT_MODEL_ID, systemPrompt, config);

        try {
            return objectMapper.readValue(response.text(), ScriptGeneratedLayout.class);
        } catch (Exception e) {
            throw new RuntimeException("Failed to parse script generation response", e);
        }
    }
}
