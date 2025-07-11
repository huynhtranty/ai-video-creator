package com.hcmus.softdes.aivideocreator.infrastructure.external.audio;

import com.hcmus.softdes.aivideocreator.application.dto.voice.TtsRequest;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.http.converter.ByteArrayHttpMessageConverter;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.http.converter.StringHttpMessageConverter;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;

@Service("azure")
public class AzureTtsService implements TtsService {

    @Value("${azure.speech.key}")
    private String apiKey;

    @Value("${azure.speech.region}")
    private String region;

    private final RestTemplate restTemplate;

    public AzureTtsService() {
        this.restTemplate = createUTF8RestTemplate();
    }

    private RestTemplate createUTF8RestTemplate() {
        RestTemplate template = new RestTemplate();

        // Configure UTF-8 message converters
        List<HttpMessageConverter<?>> converters = new ArrayList<>();

        StringHttpMessageConverter stringConverter = new StringHttpMessageConverter(StandardCharsets.UTF_8);
        stringConverter.setWriteAcceptCharset(false);
        converters.add(stringConverter);

        converters.add(new ByteArrayHttpMessageConverter());
        template.setMessageConverters(converters);

        return template;
    }

    @Override
    public byte[] synthesize(TtsRequest request) {
        try {
            String url = String.format("https://%s.tts.speech.microsoft.com/cognitiveservices/v1", region);
            String voiceName = getDefaultVoice(request.getLanguageCode(), request.getGender());
            String rateValue = formatSpeakingRate(request.getSpeakingRate());

            // Preprocess text before creating SSML
            String processedText = preprocessVietnameseText(request.getText(), request.getLanguageCode());

            String ssml = String.format("""
                <speak version='1.0' xmlns='http://www.w3.org/2001/10/synthesis' xml:lang='%s'>
                    <voice name='%s'>
                        <prosody rate='%s' pitch='medium' volume='medium'>%s</prosody>
                    </voice>
                </speak>
                """,
                    request.getLanguageCode(),
                    voiceName,
                    rateValue,
                    escapeXml(processedText)
            );

            System.out.println("SSML Request: " + ssml);
            System.out.println("Using voice: " + voiceName);

            HttpHeaders headers = new HttpHeaders();
            headers.set("Ocp-Apim-Subscription-Key", apiKey);
            headers.setContentType(MediaType.parseMediaType("application/ssml+xml; charset=UTF-8"));
            headers.set("X-Microsoft-OutputFormat", "audio-24khz-96kbitrate-mono-mp3");
            headers.set("User-Agent", "spring-client");
            headers.set("Accept-Charset", "UTF-8");

            // Ensure SSML is encoded in UTF-8
            byte[] ssmlBytes = ssml.getBytes(StandardCharsets.UTF_8);
            HttpEntity<byte[]> entity = new HttpEntity<>(ssmlBytes, headers);

            ResponseEntity<byte[]> response = restTemplate.exchange(
                    url,
                    HttpMethod.POST,
                    entity,
                    byte[].class
            );

            return response.getBody();
        } catch (Exception e) {
            throw new RuntimeException("Azure TTS REST error: " + e.getMessage(), e);
        }
    }

    private String getDefaultVoice(String languageCode, String gender) {
        return switch (languageCode + "|" + gender.toUpperCase()) {
            case "vi-VN|FEMALE" -> "vi-VN-HoaiMyNeural";
            case "vi-VN|MALE" -> "vi-VN-NamMinhNeural";
            case "en-US|FEMALE" -> "en-US-JennyNeural";
            case "en-US|MALE" -> "en-US-GuyNeural";
            case "ja-JP|FEMALE" -> "ja-JP-NanamiNeural";
            case "ja-JP|MALE" -> "ja-JP-KeitaNeural";
            default -> "en-US-JennyNeural";
        };
    }

    private String formatSpeakingRate(double speakingRate) {
        if (speakingRate <= 0) {
            speakingRate = 1.0;
        }
        if (speakingRate > 1.5) {
            speakingRate = 1.5;
        }
        if (speakingRate < 0.7) {
            speakingRate = 0.7;
        }
        return String.format("%.1f", speakingRate);
    }

    private String preprocessVietnameseText(String text, String languageCode) {
        if (!"vi-VN".equals(languageCode)) {
            return text;
        }
        text = text.trim();
        if (!text.endsWith(".") && !text.endsWith("!") && !text.endsWith("?")) {
            text += ".";
        }
        text = fixCommonVietnamesePronunciation(text);
        return text;
    }

    private String fixCommonVietnamesePronunciation(String text) {
        text = text.replaceAll("\\bSĐT\\b", "số điện thoại");
        text = text.replaceAll("\\bTP\\b", "thành phố");
        text = text.replaceAll("\\bHCM\\b", "Hồ Chí Minh");
        text = text.replaceAll("\\bVN\\b", "Việt Nam");
        text = text.replaceAll("([a-zA-Zàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ])([A-ZÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴÈÉẸẺẼÊỀẾỆỂỄÌÍỊỈĨÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠÙÚỤỦŨƯỪỨỰỬỮỲÝỴỶỸĐ])", "$1 $2");
        text = text.replaceAll("\\s+", " ");
        return text;
    }

    private String createSSMLWithPhonemes(String languageCode, String voiceName, String rateValue, String text) {
        if (text.contains("Huế")) {
            return String.format("""
                <speak version='1.0' xmlns='http://www.w3.org/2001/10/synthesis' xml:lang='%s'>
                    <voice name='%s'>
                        <prosody rate='%s'>
                            %s <phoneme alphabet='ipa' ph='hwě'>Huế</phoneme> %s
                        </prosody>
                    </voice>
                </speak>
                """,
                    languageCode, voiceName, rateValue,
                    escapeXml(text.substring(0, text.indexOf("Huế"))),
                    escapeXml(text.substring(text.indexOf("Huế") + 3))
            );
        }
        return String.format("""
            <speak version='1.0' xmlns='http://www.w3.org/2001/10/synthesis' xml:lang='%s'>
                <voice name='%s'>
                    <prosody rate='%s' pitch='medium' volume='medium'>%s</prosody>
                </voice>
            </speak>
            """,
                languageCode, voiceName, rateValue, escapeXml(text)
        );
    }

    private String escapeXml(String input) {
        if (input == null) return "";
        return input
                .replace("&", "&amp;")
                .replace("<", "&lt;")
                .replace(">", "&gt;")
                .replace("\"", "&quot;")
                .replace("'", "&apos;");
    }
}