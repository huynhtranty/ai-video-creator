package com.hcmus.softdes.aivideocreator.application.dto.request;

import lombok.Builder;
import lombok.Value;

import java.util.Date;

@Value
@Builder
public class UserDto {
    String username;
    String email;
    String fullname;
    String password;
    Date dateOfBirth;
}
