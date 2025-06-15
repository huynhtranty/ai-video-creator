package com.hcmus.softdes.aivideocreator.infrastructure.external.audio;

import com.microsoft.cognitiveservices.speech.*;
import com.microsoft.cognitiveservices.speech.audio.AudioConfig;
import com.microsoft.cognitiveservices.speech.audio.AudioOutputStream;
import com.microsoft.cognitiveservices.speech.audio.ResultReason;
import com.microsoft.cognitiveservices.speech.audio.SpeechConfig;
import com.microsoft.cognitiveservices.speech.audio.SpeechSynthesizer;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.io.IOException;

@Service
public class AzureTtsService {

    @Value("${azure.speech.key}")
    private String azureSpeechKey; // Cấu hình trong application.properties/yml
    @Value("${azure.speech.region}")
    private String azureSpeechRegion; // Cấu hình trong application.properties/yml

    public byte[] synthesizeText(String text, String languageCode, String voiceName, double speakingRate, double pitch) throws InterruptedException, IOException {
        SpeechConfig speechConfig = SpeechConfig.fromSubscription(azureSpeechKey, azureSpeechRegion);

        // Chọn giọng nói.
        // Kiểm tra tài liệu Azure Text to Speech để biết danh sách các giọng nói có sẵn
        // Ví dụ: "vi-VN-HoaiMyNeural" (nữ), "vi-VN-NamMinhNeural" (nam)
        speechConfig.setSpeechSynthesisVoiceName(voiceName);

        // Xây dựng SSML để điều chỉnh tốc độ và cao độ (hoặc dùng SSML cho biểu cảm)
        // Azure TTS cũng hỗ trợ điều chỉnh trực tiếp trong SDK nhưng SSML linh hoạt hơn
        String ssml = String.format("<speak version='1.0' xml:lang='%s'>" +
                        "<voice name='%s'>" +
                        "<prosody rate='%+d%%' pitch='%+dHz'>%s</prosody>" +
                        "</voice></speak>",
                languageCode, voiceName, (int)((speakingRate - 1.0) * 100), (int)((pitch - 1.0) * 10), text); // rate: +/-%, pitch: +/-Hz

        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        try (AudioConfig audioConfig = AudioConfig.fromStreamOutput(AudioOutputStream.createPullStream())) {
            try (SpeechSynthesizer synthesizer = new SpeechSynthesizer(speechConfig, audioConfig)) {
                SpeechSynthesisResult result = synthesizer.SpeakSsmlAsync(ssml).get();

                if (result.getReason() == ResultReason.SynthesizingAudioCompleted) {
                    // Lấy dữ liệu audio
                    outputStream.write(result.getAudioData());
                    return outputStream.toByteArray();
                } else if (result.getReason() == ResultReason.Canceled) {
                    SpeechSynthesisCancellationDetails cancellation = SpeechSynthesisCancellationDetails.fromResult(result);
                    throw new RuntimeException("Azure TTS CANCELED: Reason=" + cancellation.getReason() +
                            " ErrorDetails=" + cancellation.getErrorDetails());
                } else {
                    throw new RuntimeException("Azure TTS failed: " + result.getReason());
                }
            }
        } finally {
            if (outputStream != null) {
                outputStream.close();
            }
        }
    }
}