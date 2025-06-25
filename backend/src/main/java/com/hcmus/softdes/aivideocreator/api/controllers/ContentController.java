package com.hcmus.softdes.aivideocreator.api.controllers;

import com.google.common.collect.ImmutableList;
import com.google.common.collect.ImmutableMap;
import com.google.genai.Client;
import com.google.genai.ResponseStream;
import com.google.genai.types.*;
import com.hcmus.softdes.aivideocreator.api.contracts.contents.ContentRequest;
import com.hcmus.softdes.aivideocreator.api.contracts.contents.ImageRequest;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/contents")
public class ContentController {
    private final String SCRIPT_MODEL_ID = "gemini-2.0-flash";
    private final String IMAGE_MODEL_ID = "gemini-2.0-flash-preview-image-generation";
    
    @Value("${gemini.api.key}")
    private String apiKey;
    
    // Define path for temporary image storage
    private static final String TEMP_IMAGE_DIR = "src/main/resources/static/images/tmp/";
    
    // Ensure the directory exists
    private void ensureTempDirectoryExists() {
        try {
            Path path = Paths.get(TEMP_IMAGE_DIR);
            if (!Files.exists(path)) {
                Files.createDirectories(path);
            }
        } catch (IOException e) {
            throw new RuntimeException("Failed to create temporary directory for images", e);
        }
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

        String prompt = "Create a video script about this topic: " + request.prompt()
            + """
            .
            **Detect the language of the topic and generate all output (context, script) in the same language as the topic**.
        
            The script should include an introduction, a discussion of key points, and a conclusion.
            
            Write from the perspective of a creative director who is focused on creating a visually engaging video 
            through the context, and the storytelling aspect through the scripts.
        
            Think of the topic as a visual journey composed of sequential illustrated scenes, animations, or cinematic frames.
            To ensure all scenes feel visually unified and coherent, define a **shared visual context** that persists across the video.
            
            Please specify:
                - **Setting**: Where does this story take place? (location, time period, environment, weather, etc.)
                - **Visual Style**: Choose a clear art or cinematic style (e.g., anime, 3D Pixar, digital painting, noir, cyberpunk).
                - **Color Palette**: Dominant colors and emotional tone (e.g., warm tones, neon blues, muted pastels).
                - **Characters**: Who are the recurring characters? Describe appearance, outfits, expressions, age, personality traits.
                - **Tone/Atmosphere**: What is the mood and emotional journey? (e.g., playful, suspenseful, inspiring, nostalgic)
                - **Rules of the World**: Are there any fantastical, sci-fi, or symbolic elements that should stay consistent?
        
            This section will serve as the unified **context** for generating a consistent image style throughout the video.
        
            Then, generate the **scripts**:
            - The scripts should only focus on the storytelling aspect, not the visual elements.
            - Each script must contain a short paragraph that is vivid, informative, and concrete enough to describe a single scene,
            and they should be written so that they can be narrated in a video.
            - The scripts should be clear and concise.
            
            The length and number of scripts should be balanced: enough to explain the topic without overwhelming the viewer.
            Adapt this based on topic complexity. Usually, 4-10 scripts are sufficient for a normal topic.
            Could be more for complex topics, fewer for simpler ones.
            
            **Detect the language of the topic and generate all output
            (context, scripts) in the same language as the topic**.
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
        String imageUrl = saveImageToTempDirectory(imageBytes);
        return imageUrl;
    }
    
    /**
     * Saves image bytes to a temporary file and returns the URL path
     * @param imageBytes The binary image data
     * @return URL path to the saved image
     */
    private String saveImageToTempDirectory(byte[] imageBytes) {
        ensureTempDirectoryExists();

        String filename = UUID.randomUUID().toString() + ".jpg";
        String filepath = TEMP_IMAGE_DIR + filename;
        
        try (FileOutputStream fos = new FileOutputStream(filepath)) {
            fos.write(imageBytes);
            return "http://localhost:8080/images/tmp/" + filename;
        } catch (IOException e) {
            throw new RuntimeException("Failed to save image to temporary directory", e);
        }
    }
}
