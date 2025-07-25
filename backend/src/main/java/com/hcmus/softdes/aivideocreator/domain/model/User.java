package com.hcmus.softdes.aivideocreator.domain.model;

import com.hcmus.softdes.aivideocreator.domain.common.Entity;
import lombok.Getter;
import lombok.experimental.SuperBuilder;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.UUID;

@Getter
@SuperBuilder
public class User extends Entity {
    private String username;
    private String email;
    private String password;
    private String fullname;
    private Date dateOfBirth;

    public User(
        UUID id,
        String username,
        String email,
        String password,
        String fullname,
        Date dateOfBirth,
        LocalDateTime createdAt,
        LocalDateTime updatedAt
    ) {
        super(id, createdAt, updatedAt);
        this.username = username;
        this.password = password;
        this.fullname = fullname;
        this.email = email;
        this.dateOfBirth = dateOfBirth;
    }

    public static User create(
        String username,
        String email,
        String fullname,
        String password,
        Date dateOfBirth
    ) {
        return new User(
            UUID.randomUUID(),
            username,
            email,
            password,
            fullname,
            dateOfBirth,
            LocalDateTime.now(),
            LocalDateTime.now()
        );
    }

    public static User createGoogleUser(String email, String name) {
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        return new User(
            UUID.randomUUID(),
            email.split("@")[0],
            email,
            passwordEncoder.encode("google"), // Password is not needed for Google users
            name,
            null, // Date of birth is not provided
            LocalDateTime.now(),
            LocalDateTime.now()
        );
    }

    public void update(
        String username,
        String email,
        String fullname,
        String password,
        Date dateOfBirth
    ) {
        this.username = username;
        this.password = password;
        this.email = email;
        this.fullname = fullname;
        this.dateOfBirth = dateOfBirth;
        super.update();
    }

}
