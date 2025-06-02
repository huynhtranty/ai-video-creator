package com.hcmus.softdes.aivideocreator.domain.user;

import com.hcmus.softdes.aivideocreator.domain.common.Entity;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.UUID;

@Getter
public class User extends Entity {
    private String username;
    private String email;
    private String password;
    private Date dateOfBirth;
    private String googleId; // Added for Google OAuth
    private boolean isGoogleAccount; // Flag to indicate if this is a Google account

    protected User(
        UUID id,
        String username,
        String email,
        String password,
        Date dateOfBirth,
        String googleId,
        boolean isGoogleAccount,
        LocalDateTime createdAt,
        LocalDateTime updatedAt
    ) {
        super(id, createdAt, updatedAt);
        this.username = username;
        this.password = password;
        this.email = email;
        this.dateOfBirth = dateOfBirth;
        this.googleId = googleId;
        this.isGoogleAccount = isGoogleAccount;
    }

    public static User create(
        String username,
        String email,
        String password,
        Date dateOfBirth
    ) {
        return new User(
            UUID.randomUUID(),
            username,
            email,
            password,
            dateOfBirth,
            null, // No Google ID
            false, // Not a Google account
            LocalDateTime.now(),
            LocalDateTime.now()
        );
    }
    
    public static User createWithGoogleId(
        String username,
        String email,
        String password,
        Date dateOfBirth,
        String googleId
    ) {
        return new User(
            UUID.randomUUID(),
            username,
            email,
            password,
            dateOfBirth,
            googleId,
            true, // Is a Google account
            LocalDateTime.now(),
            LocalDateTime.now()
        );
    }

    public void update(
        String username,
        String email,
        String password,
        Date dateOfBirth
    ) {
        this.username = username;
        this.password = password;
        this.email = email;
        this.dateOfBirth = dateOfBirth;
        super.update();
    }
    
    public void linkGoogleAccount(String googleId) {
        this.googleId = googleId;
        this.isGoogleAccount = true;
        super.update();
    }
}
