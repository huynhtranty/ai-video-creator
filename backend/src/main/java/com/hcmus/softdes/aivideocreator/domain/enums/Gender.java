package com.hcmus.softdes.aivideocreator.domain.enums;

public enum Gender {
    MALE("male"),
    FEMALE("female"),
    NEUTRAL("neutral");

    public final String gender;
    Gender(String gender){this.gender = gender;}
    public String getGender() {
        return gender;
    }
}
