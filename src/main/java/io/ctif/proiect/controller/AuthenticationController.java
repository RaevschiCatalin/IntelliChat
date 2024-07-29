package io.ctif.proiect.controller;

import io.ctif.proiect.model.User;
import io.ctif.proiect.service.AuthenticationService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import javax.validation.Valid;
import java.security.Principal;
import java.util.Map;


@AllArgsConstructor
@RestController
@RequestMapping("/api/auth")
@Slf4j
public class AuthenticationController {

    private final AuthenticationService authenticationService;


    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@Valid @RequestBody User user) {
        String token = authenticationService.registerUser(user);
        log.info("User {} registered successfully", user.getEmail());
        return ResponseEntity.ok(Map.of("access_token",token));
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody Map<String, String> body) {
        String email = body.get("email");
        String password = body.get("password");
        log.info("Login attempt for user with email {} and password {}", email, password);
        try {
            String token = authenticationService.authenticateUser(email, password);
            if (token != null) {
                log.info("Token {}", token);
                return ResponseEntity.ok(Map.of("access_token", token));
            } else {
                log.info("Invalid credentials");
                return ResponseEntity.status(401).body("Invalid credentials");
            }
        } catch (IllegalStateException e) {
            log.info("Unverified email for user with email {}", email);
            return ResponseEntity.status(403).body(e.getMessage());
        }
    }
    @PostMapping("/forgot-password")
    public ResponseEntity<?> forgotPassword(@RequestBody Map<String, String> body) {
        String email = body.get("email");
        authenticationService.generateAndSendResetPasswordToken(email);
        log.info("Password reset token generated and sent to {}", email);
        return ResponseEntity.ok("Password reset email sent.");
    }
    @PostMapping("/reset-password")
    public String resetPassword(@RequestBody Map<String, String> body, Model model) {
        String token = body.get("token");
        String newPassword = body.get("new_password");

        boolean isReset = authenticationService.resetPassword(token, newPassword);
        if (isReset) {
            model.addAttribute("message", "Password reset successful. You can now log in.");
            return "reset-success";
        } else {
            model.addAttribute("message", "Invalid or expired token.");
            return "reset-error";
        }
    }


    @DeleteMapping("/delete")
    public ResponseEntity<?> deleteAllUsers() {
        authenticationService.deleteAllUsers();
        log.info("All users deleted successfully");
        return ResponseEntity.ok().body("All users deleted successfully");
    }

}



