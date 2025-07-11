package com.hcmus.softdes.aivideocreator.infrastructure.external.audio;

import com.hcmus.softdes.aivideocreator.application.dto.voice.TtsRequest;
import com.hcmus.softdes.aivideocreator.domain.model.Voice;

public interface TtsService {
    public byte[] synthesize(TtsRequest request);

}
