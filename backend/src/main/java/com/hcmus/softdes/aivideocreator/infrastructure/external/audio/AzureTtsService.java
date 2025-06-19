package com.hcmus.softdes.aivideocreator.infrastructure.external.audio;

import com.hcmus.softdes.aivideocreator.application.dto.voice.TtsRequest;
import com.hcmus.softdes.aivideocreator.domain.model.Voice;
import com.microsoft.cognitiveservices.speech.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service("azure")
public class AzureTtsService implements TtsService {

    @Value("${azure.key}")
    private String apiKey;

    @Value("${azure.region}")
    private String region;

    @Override
    public byte[] synthesize(TtsRequest request) {
        SpeechConfig config = SpeechConfig.fromSubscription(apiKey, region);
        config.setSpeechSynthesisVoiceName(request.getLanguageCode() + "-JennyNeural");

        try (SpeechSynthesizer synth = new SpeechSynthesizer(config)) {
            var result = synth.SpeakText(request.getText());
            return result.getAudioData();
        } catch (Exception e) {
            throw new RuntimeException("Azure TTS error: " + e.getMessage());
        }
    }
}