package com.hcmus.softdes.aivideocreator.api.controllers;

import com.google.common.collect.ImmutableList;
import com.google.common.collect.ImmutableMap;
import com.google.genai.Client;
import com.google.genai.ResponseStream;
import com.google.genai.types.*;
import com.hcmus.softdes.aivideocreator.api.contracts.contents.ContentRequest;
import com.hcmus.softdes.aivideocreator.api.contracts.contents.ImageRequest;
import com.hcmus.softdes.aivideocreator.infrastructure.external.r2storage.R2Client;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/contents")
public class ContentController {
    private final R2Client r2StorageService;

    private final String SCRIPT_MODEL_ID = "gemini-2.0-flash";
    private final String IMAGE_MODEL_ID = "gemini-2.0-flash-preview-image-generation";
    
    @Value("${gemini.api.key}")
    private String apiKey;

    public ContentController(R2Client r2StorageService) {
        this.r2StorageService = r2StorageService;
    }

    @PostMapping("/script")
    public String generateScript(@RequestBody ContentRequest request) {
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

        String prompt = "Create a video script about this topic: " + request.prompt() +
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
            - Avoid mentioning visuals — **do not describe the art style, camera moves, colors, or characters’ physical details**.
            - Not include any markdown, titles, or bullet points.
            - Not include or describe any text or labels in the scene visuals.
            
            The narrative should flow logically: include an introduction, key points, and a meaningful conclusion.
            
            **Language rule reminder**: All output (context and script) must match the detected language of the topic.
            """;


        GenerateContentResponse response = client.models.generateContent(SCRIPT_MODEL_ID, prompt, config);
        return response.text();
    }

    @PostMapping(value = "/image")
    public String generateImage(@RequestBody ImageRequest request) {
        Client client = Client.builder().apiKey(apiKey).build();

        String prompt = """
            Generate a detailed, stylistically consistent image based on the following:
            """ + request.context() + """
                Scene Description:
            """ + request.prompt() + """
                Use the context to ensure visual consistency across a series. Focus on the described moment,
                and align all elements (style, tone, character design, environment) with the visual context.
                The result should feel like one cinematic frame in a cohesive animated story.
            
            Please ensure that the image is:
                - High resolution (at least 1024x1024 pixels)
            """;
        
        List<Content> contents = ImmutableList.of(
            Content.builder()
                .role("user")
                .parts(ImmutableList.of(
                    Part.fromText(prompt)
                ))
                .build()
        );
        
        GenerateContentConfig config = GenerateContentConfig
            .builder()
            .responseModalities(ImmutableList.of(
                "IMAGE",
                "TEXT"
            ))
            .responseMimeType("text/plain")
            .build();

        ResponseStream<GenerateContentResponse> responseStream = client.models.generateContentStream(IMAGE_MODEL_ID, contents, config);
        
        byte[] imageBytes = null;
        
        try {
            for (GenerateContentResponse res : responseStream) {
                if (res.candidates().isEmpty() || res.candidates().get().get(0).content().isEmpty() 
                    || res.candidates().get().get(0).content().get().parts().isEmpty()) {
                    continue;
                }

                List<Part> parts = res.candidates().get().get(0).content().get().parts().get();
                for (Part part : parts) {
                    if (part.inlineData().isPresent()) {
                        Blob inlineData = part.inlineData().get();
                        if (inlineData.data().isPresent()) {
                            imageBytes = inlineData.data().get();
                            break;
                        }
                    }
                }
                
                if (imageBytes != null) {
                    break;
                }
            }
        } finally {
            responseStream.close();
        }
        
        if (imageBytes == null) {
            throw new RuntimeException("Failed to generate image");
        }

        // Temp directory for images
        String imageUrl = saveImageToCloud(imageBytes);
        return imageUrl;
    }

    /**
     * Saves image bytes to a temporary file and returns the URL path
     * @param imageBytes The binary image data
     * @return URL path to the saved image
     */
    private String saveImageToCloud(byte[] imageBytes) {
        String filename = "image-" + System.currentTimeMillis() + ".jpg";
        try {
            return r2StorageService.uploadFile(filename, imageBytes, "image/jpeg");
        } catch (Exception e) {
            throw new RuntimeException("Failed to upload image to cloud", e);
        }
    }
}
