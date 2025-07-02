package com.hcmus.softdes.aivideocreator.application.service;

import com.hcmus.softdes.aivideocreator.application.common.repositories.GoogleTokenRepository;
import com.hcmus.softdes.aivideocreator.application.common.repositories.UserRepository;
import com.hcmus.softdes.aivideocreator.application.dto.user.UserDto;
import com.hcmus.softdes.aivideocreator.domain.exception.user.UserNotFoundException;
import com.hcmus.softdes.aivideocreator.domain.model.User;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.UUID;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final GoogleTokenRepository googleTokenRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, GoogleTokenRepository googleTokenRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.googleTokenRepository = googleTokenRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public User findUserByUsername(String username) {
        var user = userRepository.findUserByUsername(username);
        if (user == null) {
            throw new UserNotFoundException();
        }
        return user;
    }

    public User findUserByEmail(String email) {
        return userRepository.findUserByEmail(email);
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


    public User findOrCreateGoogleUser(String email, String name) {
        User user = userRepository.findUserByEmail(email);
        if (user == null) {
            user = User.createGoogleUser(email, name);
            userRepository.saveUser(user);
        }
        return user;
    }

    public void saveGoogleTokens(UUID id, String accessToken, String refreshToken, Instant expiresAt) {
        User user = userRepository.findUserById(id);
        if (user == null) {
            throw new UserNotFoundException();
        }
        googleTokenRepository.saveToken(user.getEmail(), accessToken, refreshToken, expiresAt);
    }
}
