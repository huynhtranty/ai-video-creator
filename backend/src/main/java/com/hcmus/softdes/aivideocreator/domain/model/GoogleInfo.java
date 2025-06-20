package com.hcmus.softdes.aivideocreator.domain.user;

import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.Value;

@Data
@Value
@Getter
@Builder
public class GoogleInfo {
    String email;
    String accessToken;
    String refreshToken;
    Long expiresAt;
}
