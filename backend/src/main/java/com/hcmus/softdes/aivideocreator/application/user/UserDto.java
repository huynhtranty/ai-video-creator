package com.hcmus.softdes.aivideocreator.application.user;

import lombok.Builder;
import lombok.Value;

import java.util.Date;

@Value
@Builder
public class UserDto {
    String username;
    String email;
    String password;
    String name; // Added for Google authentication
    Date dateOfBirth;
}
