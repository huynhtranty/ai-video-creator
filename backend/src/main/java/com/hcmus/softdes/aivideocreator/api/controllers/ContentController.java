package com.hcmus.softdes.aivideocreator.api.controllers;

import com.google.common.collect.ImmutableList;
import com.google.common.collect.ImmutableMap;
import com.google.genai.Client;
import com.google.genai.ResponseStream;
import com.google.genai.types.*;
import com.hcmus.softdes.aivideocreator.api.contracts.contents.ContentRequest;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/contents")
public class ContentController {
    private final String SCRIPT_MODEL_ID = "gemini-2.0-flash";
    private final String IMAGE_MODEL_ID = "gemini-2.0-flash-preview-image-generation";
    
    @Value("${gemini.api.key}")
    private String apiKey;

    @GetMapping("/script")
    public String getScript(@RequestBody ContentRequest request) {
        Client client = Client.builder().apiKey(apiKey).build();

        Schema contentSchema = Schema.builder()
            .type(Type.Known.OBJECT)
            .properties(
                ImmutableMap.of(
                    "context", Schema.builder()
                        .type(Type.Known.STRING)
                        .description("The context of the content")
                        .build(),
                    "contents", Schema.builder()
                        .type(Type.Known.ARRAY)
                        .items(Schema.builder().type(Type.Known.OBJECT)
                            .properties(
                                ImmutableMap.of(
                                    "description", Schema.builder()
                                            .type(Type.Known.STRING)
                                            .description("A paragraph of the script")
                                            .build(),
                                    "subtitles", Schema.builder()
                                            .type(Type.Known.ARRAY)
                                            .items(Schema.builder()
                                                    .type(Type.Known.STRING)
                                                    .description("Subtitles for the paragraph")
                                                    .build())
                                            .build()
                                )
                            )
                            .required("description", "subtitles")
                            .build()
                        )
                        .description("List of contents")
                        .build()
                )
            )
            .required("context", "contents")
            .build();

        GenerateContentConfig config = GenerateContentConfig.builder()
            .responseMimeType("application/json")
            .candidateCount(1)
            .responseSchema(contentSchema)
            .build();

        String prompt = "Create a video script about this topic: "
            + request.prompt()
            + """ 
            . 
            The script should include an introduction, a discussion of key points, and a conclusion.
            The context of the script should use the topic and describe a more specific, more informative context,
            enough to describe the aspects of the video.
            Each content contains an description and a list of subtitles. 
            The number of contents should be long enough to cover the topic, but not too long to be overwhelming, 
            depending on the topic, it normally be 4-10 items, could be more or less than if the topic is too broad or too narrow.
            The description is a paragraph of the script
            and they should be concise, informative, and short enough to describe an image.
            The subtitles are a list of subtitles for the paragraph, they should be short and concise,
            and have be the same as the description, but split into multiple string.
            They need to have a reasonable length (18-25 words) to show as the subtitles of the video 
            (That means if you have a long sentence, split it into multiple subtitles,
            but when you split it, make sure that the subtitles still make sense and can be read easily).
            
            You should detect the language of the topic and 
            return everything in the response with the same language as the input topic.
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
