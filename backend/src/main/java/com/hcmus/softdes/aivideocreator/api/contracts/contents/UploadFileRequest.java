package com.hcmus.softdes.aivideocreator.api.contracts.contents;

import org.springframework.web.multipart.MultipartFile;

public record UploadFileRequest(
    MultipartFile file,
    String projectId,
    String scriptId
) {}
