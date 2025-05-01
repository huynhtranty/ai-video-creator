package com.hcmus.softdes.aivideocreator.api.services;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.userdetails.User;

import javax.crypto.SecretKey;
import java.util.Date;

public class JwtUtils {
    public static String generateToken(User user, String userId) {
        var builder = Jwts.builder();
        builder.claim("sub", user.getUsername());
        builder.claim("userId", userId);
        builder.expiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 24)); // 1 day
        builder.signWith(getSigningKey());
        return builder.compact();
    }

    public static Claims getClaims(String token) {
        return Jwts
                .parser()
                .verifyWith(getSigningKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }

    public static boolean isTokenValid(String token) {
        return !isExpired(token);
    }

    public static boolean isExpired(String token) {
        return getClaims(token).getExpiration().before(new Date());
    }

    public static String getUserId(String token) {
        return  getClaims(token).get("userId", String.class);
    }

    private static SecretKey getSigningKey() {
        byte[] keyBytes = Decoders.BASE64.decode("yourSecretKeyAndItMustBeLongEnoughForSecurity");
        return Keys.hmacShaKeyFor(keyBytes);
    }
}
