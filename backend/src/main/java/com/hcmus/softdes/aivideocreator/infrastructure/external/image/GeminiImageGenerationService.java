package com.hcmus.softdes.aivideocreator.infrastructure.external.image;

import com.google.common.collect.ImmutableList;
import com.google.genai.Client;
import com.google.genai.ResponseStream;
import com.google.genai.types.*;
import com.hcmus.softdes.aivideocreator.application.dto.content.ImageRequest;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("gemini-image")
public class GeminiImageGenerationService implements ImageGenerationService {

    private final String IMAGE_MODEL_ID = "gemini-2.0-flash-preview-image-generation";
    
    @Value("${gemini.api.key}")
    private String apiKey;

    private String getImagePromptStyle(String imageStyle) {
        return switch (imageStyle) {
            case "anime" -> "The image should be in anime style, with vibrant colors and exaggerated features.";
            case "realistic" -> "The image should be in realistic style, capturing lifelike details and textures.";
            case "cartoon" -> "The image should be in cartoon style, with bold outlines and simplified features.";
            case "artistic" -> "The image should be in an artistic style, focusing on creative expression and unique visual elements.";
            case "minimalist" -> "The image should be in minimalist style, emphasizing simplicity and clean lines.";
            case "classic" -> "The image should be in classic style, reminiscent of traditional art forms with a timeless quality.";
            case "ghibli" -> "The image should be in the style of Studio Ghibli, characterized by whimsical and detailed environments, with a focus on nature and emotion.";
            default -> "The image should be matching the context and request prompt, ensuring a consistent visual style.";
        };
    }

    @Override
    public byte[] generateImage(String context, String requestPrompt, String imageStyle) {
        Client client = Client.builder().apiKey(apiKey).build();

        String prompt = """
            Generate a detailed, stylistically consistent image based on the following:
            """ + context + """
                Scene Description:
            """ + requestPrompt + """
            Image Style:
            """ + getImagePromptStyle(imageStyle) + """
                Use the context to ensure visual consistency across a series. Focus on the described moment,
                and align all elements (style, tone, character design, environment) with the visual context.
                The result should feel like one cinematic frame in a cohesive animated story.
            
            Please ensure that the image is:
                - High resolution (at least 1024x768 pixels)
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

        return imageBytes;
    }
}
