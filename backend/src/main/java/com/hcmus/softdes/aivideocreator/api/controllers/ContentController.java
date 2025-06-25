package com.hcmus.softdes.aivideocreator.api.controllers;

import com.google.common.collect.ImmutableList;
import com.google.common.collect.ImmutableMap;
import com.google.genai.Client;
import com.google.genai.ResponseStream;
import com.google.genai.types.*;
import com.hcmus.softdes.aivideocreator.api.contracts.contents.ContentRequest;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/contents")
public class ContentController {
    private final String SCRIPT_MODEL_ID = "gemini-2.0-flash";
    private final String IMAGE_MODEL_ID = "gemini-2.0-flash-preview-image-generation";
    
    @Value("${gemini.api.key}")
    private String apiKey;

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
//                            .properties(
//                                ImmutableMap.of(
//                                    "description", Schema.builder()
//                                        .type(Type.Known.STRING)
//                                        .description("A paragraph of the script")
//                                        .build(),
//                                    "subtitles", Schema.builder()
//                                        .type(Type.Known.ARRAY)
//                                        .items(Schema.builder()
//                                            .type(Type.Known.STRING)
//                                            .description("Subtitles for the paragraph")
//                                            .build())
//                                        .build()
//                                )
//                            )
//                            .required("description", "subtitles")
//                            .build()
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
            
            Write from the perspective of a creative director who is designing a visual story.
        
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
            - Each script must contain a short paragraph that is vivid, informative, and concrete enough to describe a single scene.
            - The scripts will be used to generate voiceover narration and subtitles, so they should be clear and concise.
            - The context will be used to ensure that the scripts are visually coherent and consistent with the overall theme
            so the scripts don't need to have too much detail about the visual elements.
            
            The length and number of scripts should be balanced: enough to explain the topic without overwhelming the viewer.
            Adapt this based on topic complexity. Usually, 4-10 scripts are sufficient for a normal topic.
            Could be more for complex topics, fewer for simpler ones.
            
            **Detect the language of the topic and generate all output
            (context, scripts) in the same language as the topic**.
            """;


        GenerateContentResponse response = client.models.generateContent(SCRIPT_MODEL_ID, prompt, config);
        return response.text();
    }

    @GetMapping(
        value = "/image",
        produces = MediaType.IMAGE_JPEG_VALUE
    )
    public byte[] getImage(
        @RequestBody ContentRequest request
    ) {
        Client client = Client.builder().apiKey(apiKey).build();

        String prompt = "Create an image that represents the topic of the video script. " + request
            + "The image should be visually appealing, relevant to the topic, and suitable for use as a thumbnail for the video. "
            + "The image should be in JPEG format and have a resolution of at least 1280x720 pixels.";
        
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
        
        return imageBytes;
    }
}
