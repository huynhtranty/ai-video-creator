package com.hcmus.softdes.aivideocreator.application.service;

import com.hcmus.softdes.aivideocreator.application.common.repositories.UserRepository;
import com.hcmus.softdes.aivideocreator.application.dto.user.UserDto;
import com.hcmus.softdes.aivideocreator.domain.exception.user.UserNotFoundException;
import com.hcmus.softdes.aivideocreator.domain.model.User;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public User findUserByUsername(String username) {
        var user = userRepository.findUserByUsername(username);
        if (user == null) {
            throw new UserNotFoundException();
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
            user.getFullname(),
            passwordEncoder.encode(user.getPassword()),
            user.getDateOfBirth()
        );
        userRepository.saveUser(newUser);
        return newUser;
    }
}
