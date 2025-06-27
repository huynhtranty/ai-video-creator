package com.hcmus.softdes.aivideocreator.infrastructure.external.text;

import com.hcmus.softdes.aivideocreator.infrastructure.config.AzureSpeechConfig;
import com.microsoft.cognitiveservices.speech.*;
import com.microsoft.cognitiveservices.speech.audio.AudioConfig;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.file.Files;

@Service
public class STTService {

    private final AzureSpeechConfig azureSpeechConfig;

    @Autowired
    public STTService(AzureSpeechConfig azureSpeechConfig) {
        this.azureSpeechConfig = azureSpeechConfig;
    }

    public String recognizeFromAudioFile(MultipartFile audioFile) {
        SpeechConfig speechConfig = null;
        AudioConfig audioConfig = null;
        SpeechRecognizer recognizer = null;
        File tempFile = null;

        try {
            speechConfig = SpeechConfig.fromSubscription(
                    azureSpeechConfig.getSubscriptionKey(),
                    azureSpeechConfig.getRegion());
            speechConfig.setSpeechRecognitionLanguage("vi-VN");

            tempFile = convertMultiPartToFile(audioFile);
            audioConfig = AudioConfig.fromWavFileInput(tempFile.getAbsolutePath());
            recognizer = new SpeechRecognizer(speechConfig, audioConfig);

            SpeechRecognitionResult result = recognizer.recognizeOnceAsync().get();

            if (result.getReason() == ResultReason.RecognizedSpeech) {
                return result.getText();
            } else if (result.getReason() == ResultReason.NoMatch) {
                return "Không tìm thấy giọng nói khớp hoặc âm thanh không rõ ràng.";
            } else if (result.getReason() == ResultReason.Canceled) {
                CancellationDetails cancellationDetails = CancellationDetails.fromResult(result);
                System.err.println("Nhận dạng bị hủy: " + result.getReason().toString());
                System.err.println("Chi tiết lỗi: " + cancellationDetails.getErrorDetails());
                return "Nhận dạng bị hủy: " + cancellationDetails.getErrorDetails();
            }
        } catch (Exception e) {
            e.printStackTrace();
            return "Đã xảy ra lỗi trong quá trình nhận dạng: " + e.getMessage();
        } finally {
            if (recognizer != null) {
                recognizer.close();
            }
            if (audioConfig != null) {
                audioConfig.close();
            }
            if (speechConfig != null) {
                speechConfig.close();
            }
            if (tempFile != null && tempFile.exists()) {
                try {
                    Files.delete(tempFile.toPath());
                } catch (IOException e) {
                    System.err.println("Không thể xóa file tạm thời: " + tempFile.getName() + " - " + e.getMessage());
                }
            }
        }
        return "Không thể nhận dạng âm thanh.";
    }

    private File convertMultiPartToFile(MultipartFile file) throws IOException {
        File convFile = File.createTempFile("audio", file.getOriginalFilename());
        try (FileOutputStream fos = new FileOutputStream(convFile)) {
            fos.write(file.getBytes());
        }
        return convFile;
    }
}