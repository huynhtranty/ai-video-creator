package com.hcmus.softdes.aivideocreator.domain.enums;

public enum Platform {
    NONE("None"),
    YOUTUBE("YouTube"),
    FACEBOOK("Facebook"),
    INSTAGRAM("Instagram"),
    TIKTOK("TikTok");

    private final String displayName;
    Platform(String displayName) {
        this.displayName = displayName;
    }
    public String getDisplayName() {
        return displayName;
    }
}
