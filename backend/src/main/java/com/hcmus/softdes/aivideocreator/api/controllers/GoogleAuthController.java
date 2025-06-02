package com.hcmus.softdes.aivideocreator.api.controllers;

import com.hcmus.softdes.aivideocreator.api.contracts.auth.AuthResponse;
import com.hcmus.softdes.aivideocreator.api.contracts.auth.GoogleAuthRequest;
import com.hcmus.softdes.aivideocreator.api.services.JwtUtils;
import com.hcmus.softdes.aivideocreator.application.user.UserDto;
import com.hcmus.softdes.aivideocreator.application.user.UserService;
import com.hcmus.softdes.aivideocreator.domain.user.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.ArrayList;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/auth/google")
public class GoogleAuthController {

    private final UserService userService;
    private final WebClient webClient;

    @Autowired
    public GoogleAuthController(UserService userService) {
        this.userService = userService;
        this.webClient = WebClient.builder().build();
    }

    @PostMapping("/callback")
    public ResponseEntity<AuthResponse> handleGoogleCallback(@RequestBody GoogleAuthRequest request) {
        // 1. Verify the Google ID token with Google's servers
        Map<String, Object> googleUserInfo = verifyGoogleIdToken(request.idToken());
        
        if (googleUserInfo == null) {
            return ResponseEntity.badRequest().build();
        }
        
        String email = (String) googleUserInfo.get("email");
        String name = (String) googleUserInfo.get("name");
        String googleId = (String) googleUserInfo.get("sub");
        
        // 2. Check if the user already exists in our database
        User applicationUser = userService.findUserByEmail(email);
        
        // 3. If user doesn't exist, create a new user
        if (applicationUser == null) {
            // Generate a random password for the user
            String randomPassword = UUID.randomUUID().toString();
            
            // Create a new user with builder pattern
            UserDto newUserDto = UserDto.builder()
                .username(email.split("@")[0]) // Use part of email as username
                .email(email)
                .password(randomPassword)
                .name(name)
                .build();
            
            applicationUser = userService.registerGoogleUser(newUserDto, googleId);
        }
        
        // 4. Generate JWT token
        org.springframework.security.core.userdetails.User userDetails = new org.springframework.security.core.userdetails.User(
            applicationUser.getUsername(),
            applicationUser.getPassword(),
            new ArrayList<>()
        );
        
        String jwtToken = JwtUtils.generateToken(userDetails, applicationUser.getId().toString());
        
        // 5. Set cookie and return response
        HttpHeaders headers = new HttpHeaders();
        headers.add("Set-Cookie", "authorization=" + jwtToken + "; Path=/; HttpOnly");
        
        var response = new AuthResponse(applicationUser, jwtToken);
        return ResponseEntity.ok().headers(headers).body(response);
    }
    
    private Map<String, Object> verifyGoogleIdToken(String idToken) {
        try {
            // Call Google's tokeninfo endpoint to verify the token
            return webClient.get()
                .uri("https://oauth2.googleapis.com/tokeninfo?id_token=" + idToken)
                .retrieve()
                .bodyToMono(Map.class)
                .block();
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
}
