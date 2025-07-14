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

    private String getVoiceName(String languageCode, String gender) {
        String genderSuffix = "FEMALE".equalsIgnoreCase(gender) ? "A" : "D";
        
        switch (languageCode) {
            case "vi-VN":
                return "vi-VN-Neural2-" + genderSuffix;
            case "en-US":
                return "en-US-Neural2-" + genderSuffix;
            case "ja-JP":
                return "ja-JP-Neural2-" + genderSuffix;
            case "ko-KR":
                return "ko-KR-Neural2-" + genderSuffix;
            case "zh-CN":
                return "zh-CN-Neural2-" + genderSuffix;
            default:
                return languageCode + "-Standard-" + genderSuffix;
        }
    }

    @Override
    public byte[] synthesize(TtsRequest request) {
        try {
            SynthesisInput input = SynthesisInput.newBuilder().setText(request.getText()).build();
            VoiceSelectionParams voice = VoiceSelectionParams.newBuilder()
                    .setLanguageCode(request.getLanguageCode())
                    .setName(getVoiceName(request.getLanguageCode(), request.getGender()))
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
