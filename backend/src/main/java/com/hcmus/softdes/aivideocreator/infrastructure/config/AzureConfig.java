package com.hcmus.softdes.aivideocreator.infrastructure.config;

import com.azure.storage.blob.BlobContainerClient;
import com.azure.storage.blob.BlobServiceClient;
import com.azure.storage.blob.BlobServiceClientBuilder;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
@Slf4j
public class AzureConfig {

    @Value("${azure.storage.connection-string}")
    private String connectionString;

    @Value("${azure.storage.container-name}")
    private String containerName;

    @Bean
    public BlobServiceClient blobServiceClient() {
        log.info("Initializing Azure Blob Service Client");
        return new BlobServiceClientBuilder()
                .connectionString(connectionString)
                .buildClient();
    }

    @Bean
    public BlobContainerClient blobContainerClient(BlobServiceClient blobServiceClient) {
        log.info("Initializing Azure Blob Container Client for container: {}", containerName);
        BlobContainerClient containerClient = blobServiceClient.getBlobContainerClient(containerName);

        // Create container if it doesn't exist
        if (!containerClient.exists()) {
            log.info("Creating container: {}", containerName);
            containerClient.create();
        }

        return containerClient;
    }
}