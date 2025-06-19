package com.hcmus.softdes.aivideocreator.api.mappers;

import com.hcmus.softdes.aivideocreator.api.contracts.auth.UserResponse;
import com.hcmus.softdes.aivideocreator.domain.model.User;

public class UserMapper {
    public static UserResponse toUserResponse(User userDto) {
        return new UserResponse(
            userDto.getId().toString(),
            userDto.getUsername(),
            userDto.getEmail(),
            userDto.getFullname(),
            userDto.getDateOfBirth()
        );
    }
}
