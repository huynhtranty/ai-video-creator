package com.hcmus.softdes.aivideocreator.infrastructure.external.audio;

import com.google.cloud.texttospeech.v1.*;
import com.hcmus.softdes.aivideocreator.application.dto.voice.TtsRequest;
import com.hcmus.softdes.aivideocreator.domain.model.Voice;
import org.springframework.stereotype.Service;

@Service("google")
public class GoogleTTSService implements TtsService {
    @Override
    public byte[] synthesize(TtsRequest request) {
        try (TextToSpeechClient client = TextToSpeechClient.create()) {
            SynthesisInput input = SynthesisInput.newBuilder().setText(request.getText()).build();
            VoiceSelectionParams voice = VoiceSelectionParams.newBuilder()
                    .setLanguageCode(request.getLanguageCode())
                    .setSsmlGender(SsmlVoiceGender.valueOf(request.getGender()))
                    .build();
            AudioConfig config = AudioConfig.newBuilder()
                    .setAudioEncoding(AudioEncoding.MP3)
                    .setSpeakingRate(request.getSpeakingRate())
                    .build();
            var response = client.synthesizeSpeech(input, voice, config);
            return response.getAudioContent().toByteArray();
        } catch (Exception e) {
            throw new RuntimeException("Google TTS error: " + e.getMessage());
        }
    }
}
