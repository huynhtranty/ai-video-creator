package com.hcmus.softdes.aivideocreator.infrastructure.external.image;

import com.hcmus.softdes.aivideocreator.api.contracts.contents.ImageRequest;

public interface ImageGenerationService {
    byte[] generateImage(ImageRequest request);
}
