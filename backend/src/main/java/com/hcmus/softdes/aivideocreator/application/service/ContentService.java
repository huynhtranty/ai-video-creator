package com.hcmus.softdes.aivideocreator.application.service;

import com.hcmus.softdes.aivideocreator.application.common.repositories.MediaRepository;
import com.hcmus.softdes.aivideocreator.application.common.repositories.ProjectRepository;
import com.hcmus.softdes.aivideocreator.application.common.repositories.ScriptRepository;
import com.hcmus.softdes.aivideocreator.application.dto.content.*;
import com.hcmus.softdes.aivideocreator.domain.model.MediaAsset;
import com.hcmus.softdes.aivideocreator.domain.model.Script;
import com.hcmus.softdes.aivideocreator.infrastructure.external.image.ImageGenerationService;
import com.hcmus.softdes.aivideocreator.infrastructure.external.script.ScriptGenerationService;
import com.hcmus.softdes.aivideocreator.infrastructure.external.r2storage.R2Service;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
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
    private final MediaRepository mediaRepository;
    private final ProjectRepository projectRepository;

    public ContentService(
            List<ScriptGenerationService> scriptServices,
            List<ImageGenerationService> imageServices,
            R2Service r2StorageService,
            ScriptRepository scriptRepository,
            MediaRepository mediaRepository,
            ProjectRepository projectRepository
    ) {
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
        this.mediaRepository = mediaRepository;
        this.projectRepository = projectRepository;
    }

    @Transactional
    public ScriptLayout generateScript(ScriptLayoutRequest request) {
        var providerKey = request.provider().toLowerCase();
        ScriptGenerationService provider = scriptProviders.get(providerKey);
        if (provider == null) {
            throw new RuntimeException("Script generation provider not supported: " + providerKey);
        }

        if (request.projectId() == null || request.projectId().isEmpty()) {
            throw new RuntimeException("projectId must be provided for script generation");
        }

        UUID projectId;
        try {
            projectId = UUID.fromString(request.projectId());
        } catch (IllegalArgumentException e) {
            throw new RuntimeException("Invalid projectId: must be a valid UUID", e);
        }

        ScriptGeneratedLayout scriptContent = provider.generateScript(request.prompt());

        var project = projectRepository.findById(projectId)
                .orElseThrow(() -> new RuntimeException("Project not found with id: " + projectId));
        project.setContext(scriptContent.getContext());
        projectRepository.save(project);

        var scripts = new ArrayList<Script>();
        int order = 0;
        for (String scriptText : scriptContent.getScripts()) {
            Script script = Script.create(scriptText, projectId, order++);
            scriptRepository.saveScript(script);
            scripts.add(script);
        }

        return ScriptLayout.builder()
                .context(scriptContent.getContext())
                .language(scriptContent.getLanguageCode())
                .scripts(scripts)
                .build();
    }

    @Transactional
    public Script regenerateScript(String scriptId, String providerName) {
        UUID scriptUuid;
        try {
            scriptUuid = UUID.fromString(scriptId);
        } catch (IllegalArgumentException e) {
            throw new RuntimeException("Invalid id: must be a valid UUID", e);
        }

        Script existingScript = scriptRepository.findScriptById(scriptUuid);
        if (existingScript == null) {
            throw new RuntimeException("Script not found with id: " + scriptId);
        }

        ScriptGenerationService provider = scriptProviders.get(providerName.toLowerCase());
        if (provider == null) {
            throw new RuntimeException("Script generation provider not supported: " + providerName);
        }
        var project = projectRepository.findById(existingScript.getProjectId())
                .orElseThrow(() -> new RuntimeException("Project not found with id: " + existingScript.getProjectId()));

        String regeneratedContent = provider.regenerateScript(
            project.getImageContext(),
            existingScript.getContent()
        );
        existingScript.update(regeneratedContent);
        scriptRepository.saveScript(existingScript);

        return existingScript;
    }

    public Script updateScript(String scriptId, String content) {
        UUID scriptUuid;
        try {
            scriptUuid = UUID.fromString(scriptId);
        } catch (IllegalArgumentException e) {
            throw new RuntimeException("Invalid id: must be a valid UUID", e);
        }

        Script existingScript = scriptRepository.findScriptById(scriptUuid);
        if (existingScript == null) {
            throw new RuntimeException("Script not found with id: " + scriptId);
        }

        existingScript.update(content);
        scriptRepository.saveScript(existingScript);

        return existingScript;
    }

    public MediaAsset generateImage(ImageRequest request) {
        var providerKey = request.provider().toLowerCase();
        ImageGenerationService provider = imageProviders.get(providerKey);
        if (provider == null) {
            throw new RuntimeException("Image generation provider not supported: " + providerKey);
        }

        if (request.projectId() == null || request.projectId().isEmpty()) {
            throw new RuntimeException("projectId must be provided for image generation");
        }

        UUID projectId;
        try {
            projectId = UUID.fromString(request.projectId());
        } catch (IllegalArgumentException e) {
            throw new RuntimeException("Invalid projectId: must be a valid UUID", e);
        }

        var existingMedia = mediaRepository.findMediaByScriptId(UUID.fromString(request.scriptId()));
        if (existingMedia != null) {
            throw new RuntimeException("Media already exists for scriptId: " + request.scriptId());
        }

        byte[] imageBytes = provider.generateImage(request.context(), request.prompt());
        String filename = "image-" + System.currentTimeMillis() + ".jpg";
        String url = r2StorageService.uploadFile(filename, imageBytes, "image/jpeg");

        MediaAsset mediaAsset = MediaAsset.create(
            request.prompt(),
            request.provider(),
            url,
            filename,
            projectId,
            UUID.fromString(request.scriptId())
        );
        mediaRepository.saveMedia(mediaAsset);

        return mediaAsset;
    }

    public MediaAsset regenerateImage(String scriptId, String providerName) {
        UUID scriptUuid;
        try {
            scriptUuid = UUID.fromString(scriptId);
        } catch (IllegalArgumentException e) {
            throw new RuntimeException("Invalid id: must be a valid UUID", e);
        }

        MediaAsset existingMedia = mediaRepository.findMediaByScriptId(scriptUuid);
        if (existingMedia == null) {
            throw new RuntimeException("Media not found for scriptId: " + scriptId);
        }

        ImageGenerationService provider = imageProviders.get(providerName.toLowerCase());
        if (provider == null) {
            throw new RuntimeException("Image generation provider not supported: " + providerName);
        }

        var project = projectRepository.findById(existingMedia.getProjectId())
                .orElseThrow(() -> new RuntimeException("Project not found with id: " + existingMedia.getProjectId()));

        byte[] imageBytes = provider.generateImage(
            project.getImageContext(),
            existingMedia.getText()
        );
        String filename = "image-" + System.currentTimeMillis() + ".jpg";
        String url = r2StorageService.uploadFile(filename, imageBytes, "image/jpeg");

        existingMedia.update(existingMedia.getText(), providerName, url, filename);
        mediaRepository.saveMedia(existingMedia);

        return existingMedia;
    }

    @Transactional
    public MediaAsset uploadImageFile(MultipartFile file, String projectId, String scriptId) {
        if (file == null || file.isEmpty()) {
            throw new RuntimeException("File must be provided for upload");
        }

        if (projectId == null || projectId.isEmpty()) {
            throw new RuntimeException("projectId must be provided for image upload");
        }

        UUID projectUuid;
        UUID scriptUuid;
        try {
            projectUuid = UUID.fromString(projectId);
            scriptUuid = UUID.fromString(scriptId);
        } catch (IllegalArgumentException e) {
            throw new RuntimeException("Invalid id: must be a valid UUID", e);
        }

        byte[] imageBytes;
        try {
            imageBytes = file.getBytes();
        } catch (Exception e) {
            throw new RuntimeException("Failed to read the uploaded file", e);
        }

        mediaRepository.deleteMediaByScriptId(scriptUuid);
        var existingScript = scriptRepository.findScriptById(scriptUuid);

        String filename = "image-" + System.currentTimeMillis() + "-" + file.getOriginalFilename();
        String url = r2StorageService.uploadFile(filename, imageBytes, "image/jpeg");

        MediaAsset mediaAsset = MediaAsset.create(
            existingScript.getContent(),
            null,
            url,
            filename,
            projectUuid,
            scriptUuid
        );
        mediaRepository.saveMedia(mediaAsset);

        return mediaAsset;
    }
}
