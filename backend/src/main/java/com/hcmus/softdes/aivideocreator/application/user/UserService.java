package com.hcmus.softdes.aivideocreator.application.user;

import com.hcmus.softdes.aivideocreator.application.common.interfaces.repositories.UserRepository;
import com.hcmus.softdes.aivideocreator.domain.user.User;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
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
            passwordEncoder.encode(user.getPassword()),
            user.getDateOfBirth()
        );
        userRepository.saveUser(newUser);
        return newUser;
    }
    
    public User registerGoogleUser(UserDto user, String googleId) {
        // Check if user with this email already exists
        var existingUserByEmail = userRepository.findUserByEmail(user.getEmail());
        if (existingUserByEmail != null) {
            // User already exists with this email, link Google ID and return
            existingUserByEmail.linkGoogleAccount(googleId);
            userRepository.updateUser(existingUserByEmail);
            return existingUserByEmail;
        }
        
        // Check if username exists
        var existingUserByUsername = userRepository.findUserByUsername(user.getUsername());
        String username = user.getUsername();
        
        // If username exists, append a number to make it unique
        if (existingUserByUsername != null) {
            int counter = 1;
            while (userRepository.findUserByUsername(username + counter) != null) {
                counter++;
            }
            username = username + counter;
        }
        
        // Create new user with Google info
        User newUser = User.createWithGoogleId(
            username,
            user.getEmail(),
            passwordEncoder.encode(user.getPassword()),
            user.getDateOfBirth(),
            googleId
        );
        
        userRepository.saveUser(newUser);
        return newUser;
    }
}
