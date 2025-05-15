package com.hcmus.softdes.aivideocreator.application.user;

import com.hcmus.softdes.aivideocreator.application.common.exceptions.NotFoundException;

public class UserNotFoundException extends NotFoundException {
    public UserNotFoundException() {
        super("User not found");
    }
}
