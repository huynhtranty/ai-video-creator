package com.hcmus.softdes.aivideocreator.infrastructure.external.image;

import com.hcmus.softdes.aivideocreator.application.dto.content.ImageRequest;

public interface ImageGenerationService {
    byte[] generateImage(String context, String requestPrompt);
}
