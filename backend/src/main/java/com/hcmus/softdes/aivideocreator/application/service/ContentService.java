package com.hcmus.softdes.aivideocreator.application.service;

import com.hcmus.softdes.aivideocreator.application.common.repositories.ScriptRepository;
import com.hcmus.softdes.aivideocreator.application.dto.content.ImageRequest;
import com.hcmus.softdes.aivideocreator.application.dto.content.ImageResponse;
import com.hcmus.softdes.aivideocreator.application.dto.content.ScriptRequest;
import com.hcmus.softdes.aivideocreator.application.dto.content.ScriptResponse;
import com.hcmus.softdes.aivideocreator.domain.model.Script;
import com.hcmus.softdes.aivideocreator.infrastructure.external.image.ImageGenerationService;
import com.hcmus.softdes.aivideocreator.infrastructure.external.script.ScriptGenerationService;
import com.hcmus.softdes.aivideocreator.infrastructure.external.r2storage.R2Service;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class ContentService {
    private final Map<String, ScriptGenerationService> scriptProviders;
    private final Map<String, ImageGenerationService> imageProviders;
    private final R2Service r2StorageService;
    private final ScriptRepository scriptRepository;

    public ContentService(List<ScriptGenerationService> scriptServices,
                         List<ImageGenerationService> imageServices,
                         R2Service r2StorageService,
                         ScriptRepository scriptRepository) {
        this.scriptProviders = scriptServices.stream()
            .collect(Collectors.toMap(
                s -> s.getClass().getAnnotation(Service.class).value(),
                s -> s
            ));
        this.imageProviders = imageServices.stream()
            .collect(Collectors.toMap(
                s -> s.getClass().getAnnotation(Service.class).value(),
                s -> s
            ));
        this.r2StorageService = r2StorageService;
        this.scriptRepository = scriptRepository;
    }

    public ScriptResponse generateScript(ScriptRequest request) {
        var providerKey = request.provider().toLowerCase();
        ScriptGenerationService provider = scriptProviders.get(providerKey);
        if (provider == null) {
            throw new RuntimeException("Script generation provider not supported: " + providerKey);
        }

        // Convert to the contract request format expected by the service
        var contractRequest = new com.hcmus.softdes.aivideocreator.api.contracts.contents.ContentRequest(
            request.prompt()
        );
        
        String scriptContent = provider.generateScript(contractRequest);

        // Save script to repository if projectId is provided
        if (request.projectId() != null && !request.projectId().isEmpty()) {
            UUID projectId;
            try {
                projectId = UUID.fromString(request.projectId());
            } catch (IllegalArgumentException e) {
                throw new RuntimeException("Invalid projectId: must be a valid UUID", e);
            }
            
            Script script = Script.create(scriptContent, projectId);
            scriptRepository.saveScript(script);
        }

        return new ScriptResponse(scriptContent, providerKey);
    }

    public ImageResponse generateImage(ImageRequest request) {
        var providerKey = request.provider().toLowerCase();
        ImageGenerationService provider = imageProviders.get(providerKey);
        if (provider == null) {
            throw new RuntimeException("Image generation provider not supported: " + providerKey);
        }

        // Convert to the contract request format expected by the service
        var contractRequest = new com.hcmus.softdes.aivideocreator.api.contracts.contents.ImageRequest(
            request.prompt(),
            request.context()
        );

        byte[] imageBytes = provider.generateImage(contractRequest);
        String filename = "image-" + System.currentTimeMillis() + ".jpg";
        String url = r2StorageService.uploadFile(filename, imageBytes, "image/jpeg");

        // Save media asset to repository if projectId is provided
        if (request.projectId() != null && !request.projectId().isEmpty()) {
            UUID projectId;
            try {
                projectId = UUID.fromString(request.projectId());
            } catch (IllegalArgumentException e) {
                throw new RuntimeException("Invalid projectId: must be a valid UUID", e);
            }
            
            // Note: For now, we're not storing MediaAssets directly since there's no repository
            // This could be added later if needed, similar to how Voice has VoiceRepository
        }

        return new ImageResponse(url, "jpg", providerKey);
    }
}
