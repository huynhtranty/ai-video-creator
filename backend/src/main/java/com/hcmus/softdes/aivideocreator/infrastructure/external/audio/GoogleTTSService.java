package com.hcmus.softdes.aivideocreator.infrastructure.external.audio;

import com.google.cloud.texttospeech.v1.*;
import com.hcmus.softdes.aivideocreator.application.dto.voice.TtsRequest;
import com.hcmus.softdes.aivideocreator.domain.model.Voice;
import org.springframework.stereotype.Service;

@Service("google")
public class GoogleTTSService implements TtsService {

    private final TextToSpeechClient ttsClient;

    public GoogleTTSService(TextToSpeechClient ttsClient) {
        this.ttsClient = ttsClient;
    }

    @Override
    public byte[] synthesize(TtsRequest request) {
        try {
            SynthesisInput input = SynthesisInput.newBuilder().setText(request.getText()).build();
            VoiceSelectionParams voice = VoiceSelectionParams.newBuilder()
                    .setLanguageCode(request.getLanguageCode())
                    .setSsmlGender(SsmlVoiceGender.valueOf(request.getGender().toUpperCase()))
                    .build();
            AudioConfig config = AudioConfig.newBuilder()
                    .setAudioEncoding(AudioEncoding.MP3)
                    .setSpeakingRate(request.getSpeakingRate())
                    .build();
            SynthesizeSpeechResponse response = ttsClient.synthesizeSpeech(input, voice, config);
            return response.getAudioContent().toByteArray();
        } catch (Exception e) {
            throw new RuntimeException("Google TTS error: " + e.getMessage());
        }
    }
}
