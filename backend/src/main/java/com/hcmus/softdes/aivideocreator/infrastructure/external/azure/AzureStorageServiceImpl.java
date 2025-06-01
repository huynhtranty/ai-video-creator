//package com.hcmus.softdes.aivideocreator.infrastructure.external.azure;
//
//import com.azure.storage.blob.BlobClient;
//import com.azure.storage.blob.BlobContainerClient;
//import com.azure.storage.blob.models.BlobHttpHeaders;
//import com.azure.storage.blob.models.BlobItem;
//import com.azure.storage.blob.models.BlobProperties;
//import lombok.RequiredArgsConstructor;
//import lombok.extern.slf4j.Slf4j;
//import org.springframework.stereotype.Service;
//import org.springframework.web.multipart.MultipartFile;
//
//import java.io.ByteArrayInputStream;
//import java.io.IOException;
//import java.io.InputStream;
//import java.time.LocalDateTime;
//import java.time.format.DateTimeFormatter;
//import java.util.List;
//import java.util.Map;
//import java.util.UUID;
//import java.util.stream.Collectors;
//import com.hcmus.softdes.aivideocreator.domain.service.AzureStorageService;
//@Service
//@RequiredArgsConstructor
//@Slf4j
//public class AzureStorageServiceImpl implements AzureStorageService {
//
//    private final BlobContainerClient blobContainerClient;
//
//    @Override
//    public String uploadFile(MultipartFile file, String folder) throws IOException {
//        String fileName = generateFileName(file.getOriginalFilename(), folder);
//        return uploadFile(file.getInputStream(), fileName, file.getContentType(), file.getSize());
//    }
//
//    @Override
//    public String uploadFile(byte[] data, String fileName, String contentType) {
//        return uploadFile(new ByteArrayInputStream(data), fileName, contentType, data.length);
//    }
//
//    @Override
//    public String uploadFile(InputStream inputStream, String fileName, String contentType, long size) {
//        try {
//            BlobClient blobClient = blobContainerClient.getBlobClient(fileName);
//
//            // Set content type and other headers
//            BlobHttpHeaders headers = new BlobHttpHeaders()
//                    .setContentType(contentType)
//                    .setCacheControl("public, max-age=31536000"); // Cache for 1 year
//
//            // Upload with metadata
//            Map<String, String> metadata = Map.of(
//                    "uploadTime", LocalDateTime.now().toString(),
//                    "originalSize", String.valueOf(size)
//            );
//
//            blobClient.upload(inputStream, size, true);
//            blobClient.setHttpHeaders(headers);
//            blobClient.setMetadata(metadata);
//
//            String url = blobClient.getBlobUrl();
//            log.info("File uploaded successfully: {}", url);
//            return url;
//
//        } catch (Exception e) {
//            log.error("Error uploading file: {}", fileName, e);
//            throw new RuntimeException("Failed to upload file to Azure Storage", e);
//        }
//    }
//
//    @Override
//    public byte[] downloadFile(String fileName) {
//        try {
//            BlobClient blobClient = blobContainerClient.getBlobClient(fileName);
//            return blobClient.downloadContent().toBytes();
//        } catch (Exception e) {
//            log.error("Error downloading file: {}", fileName, e);
//            throw new RuntimeException("Failed to download file from Azure Storage", e);
//        }
//    }
//
//    @Override
//    public void deleteFile(String fileName) {
//        try {
//            BlobClient blobClient = blobContainerClient.getBlobClient(fileName);
//            blobClient.delete();
//            log.info("File deleted successfully: {}", fileName);
//        } catch (Exception e) {
//            log.error("Error deleting file: {}", fileName, e);
//            throw new RuntimeException("Failed to delete file from Azure Storage", e);
//        }
//    }
//
//    @Override
//    public boolean fileExists(String fileName) {
//        try {
//            BlobClient blobClient = blobContainerClient.getBlobClient(fileName);
//            return blobClient.exists();
//        } catch (Exception e) {
//            log.error("Error checking file existence: {}", fileName, e);
//            return false;
//        }
//    }
//
//    @Override
//    public List<String> listFiles(String prefix) {
//        try {
//            return blobContainerClient.listBlobsByHierarchy(prefix)
//                    .stream()
//                    .filter(blobItem -> !blobItem.isPrefix())
//                    .map(BlobItem::getName)
//                    .collect(Collectors.toList());
//        } catch (Exception e) {
//            log.error("Error listing files with prefix: {}", prefix, e);
//            throw new RuntimeException("Failed to list files from Azure Storage", e);
//        }
//    }
//
//    @Override
//    public String getFileUrl(String fileName) {
//        BlobClient blobClient = blobContainerClient.getBlobClient(fileName);
//        return blobClient.getBlobUrl();
//    }
//
//    @Override
//    public long getFileSize(String fileName) {
//        try {
//            BlobClient blobClient = blobContainerClient.getBlobClient(fileName);
//            BlobProperties properties = blobClient.getProperties();
//            return properties.getBlobSize();
//        } catch (Exception e) {
//            log.error("Error getting file size: {}", fileName, e);
//            return -1;
//        }
//    }
//
//    private String generateFileName(String originalFileName, String folder) {
//        String timestamp = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyyMMdd_HHmmss"));
//        String uuid = UUID.randomUUID().toString().substring(0, 8);
//        String extension = getFileExtension(originalFileName);
//        return String.format("%s/%s_%s%s", folder, timestamp, uuid, extension);
//    }
//
//    private String getFileExtension(String fileName) {
//        if (fileName == null || !fileName.contains(".")) {
//            return "";
//        }
//        return fileName.substring(fileName.lastIndexOf("."));
//    }
//}
