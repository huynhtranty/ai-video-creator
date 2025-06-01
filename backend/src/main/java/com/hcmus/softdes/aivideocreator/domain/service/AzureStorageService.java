package com.hcmus.softdes.aivideocreator.domain.service;

import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.io.InputStream;
import java.util.List;

public interface AzureStorageService {
    String uploadFile(MultipartFile file, String folder) throws IOException;
    String uploadFile(byte[] data, String fileName, String contentType);
    String uploadFile(InputStream inputStream, String fileName, String contentType, long size);
    byte[] downloadFile(String fileName);
    void deleteFile(String fileName);
    boolean fileExists(String fileName);
    List<String> listFiles(String prefix);
    String getFileUrl(String fileName);
    long getFileSize(String fileName);
}