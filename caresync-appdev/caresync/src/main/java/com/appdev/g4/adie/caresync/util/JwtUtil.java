package com.appdev.g4.adie.caresync.util;

import java.security.Key;
import java.util.Date;

import org.springframework.stereotype.Component;

import com.appdev.g4.adie.caresync.entity.User;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

@Component
public class JwtUtil {

    private final Key SIGNING_KEY;

    private static final long EXPIRATION_TIME = 86400000; // 24 hours

    public JwtUtil() {
        this.SIGNING_KEY = Keys.secretKeyFor(SignatureAlgorithm.HS512);
    }

    // Generate JWT Token
    public String generateToken(User user) {
        return Jwts.builder()
                .setSubject(user.getUsername())
                .claim("userId", user.getUserId())
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(SIGNING_KEY, SignatureAlgorithm.HS512)
                .compact();
    }

    // Validate JWT Token
    public boolean validateToken(String token) {
        try {
            Jwts.parserBuilder()
                .setSigningKey(SIGNING_KEY)
                .build()
                .parseClaimsJws(token);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    // Extract Claims
    public String extractUsername(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(SIGNING_KEY)
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }
}
