package com.hcmus.softdes.aivideocreator.application.services;

import com.hcmus.softdes.aivideocreator.application.dto.UserDto;
import com.hcmus.softdes.aivideocreator.application.interfaces.repositories.UserRepository;
import com.hcmus.softdes.aivideocreator.domain.user.User;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User findUserByUsername(String username) {
        var user = userRepository.findUserByUsername(username);
        if (user == null) {
            throw new RuntimeException("User not found");
        }
        return user;
    }

    public User registerUser(UserDto user) {
        var existingUser = userRepository.findUserByUsername(user.getUsername());
        if (existingUser != null) {
            throw new RuntimeException("Username already exists");
        }

        User newUser = User.create(
            user.getUsername(),
            user.getEmail(),
            user.getPassword(),
            user.getDateOfBirth()
        );

        return newUser;
    }
}
