package io.ctif.proiect.service;

import io.ctif.proiect.exceptions.EmailExistsException;
import io.ctif.proiect.exceptions.UsernameExistsException;
import io.ctif.proiect.model.PasswordResetToken;
import io.ctif.proiect.model.User;
import io.ctif.proiect.repository.EmailVerificationTokenRepository;
import io.ctif.proiect.repository.PasswordResetTokenRepository;
import io.ctif.proiect.repository.Repository;
import jakarta.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

@Slf4j
@Service
public class AuthenticationService {
    private final Repository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final EmailVerificationService emailVerificationService;
    private final PasswordResetTokenRepository passwordResetTokenRepository;
    private final EmailVerificationTokenRepository emailVerificationTokenRepository;

    @Autowired
    public AuthenticationService(Repository userRepository, PasswordEncoder passwordEncoder, JwtService jwtService,
                                 EmailVerificationService emailVerificationService, PasswordResetTokenRepository passwordResetTokenRepository, EmailVerificationTokenRepository emailVerificationTokenRepository) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
        this.emailVerificationService = emailVerificationService;
        this.passwordResetTokenRepository = passwordResetTokenRepository;
        this.emailVerificationTokenRepository = emailVerificationTokenRepository;
    }

    public String registerUser(User user) {
        userRepository.findByEmail(user.getEmail()).ifPresent(u -> {
            throw new EmailExistsException("Email already exists: " + user.getEmail());
        });
        userRepository.findByUsername(user.getUsername()).ifPresent(u -> {
            throw new UsernameExistsException("Username already exists: " + user.getUsername());
        });
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setEnabled(false);
        userRepository.save(user);
        emailVerificationService.generateAndSendVerificationToken(user);
        return jwtService.generateToken(user.getEmail());
    }

    public String authenticateUser(String email, String password) {
        Optional<User> user = userRepository.findByEmail(email);
        if (user.isPresent() && passwordEncoder.matches(password, user.get().getPassword())) {
            if (!user.get().isEnabled()) {
                throw new IllegalStateException("Email not verified. Please verify your email before logging in.");
            }
            return jwtService.generateToken(email);
        }
        return null;
    }

    @Transactional
    public void generateAndSendResetPasswordToken(String email) {
        User user = userRepository.findByEmail(email).orElseThrow(() -> new IllegalStateException("User not found"));
        PasswordResetToken existingToken = passwordResetTokenRepository.findByUser(user);

        if (existingToken != null) {
            passwordResetTokenRepository.delete(existingToken);
        }
        String token = UUID.randomUUID().toString();
        PasswordResetToken resetToken = new PasswordResetToken();
        resetToken.setToken(token);
        resetToken.setUser(user);
        resetToken.setExpiryDate(LocalDateTime.now().plusHours(24));
        passwordResetTokenRepository.save(resetToken);
        emailVerificationService.sendResetPasswordEmail(user, token);
    }

    @Transactional
    public boolean resetPassword(String token, String newPassword) {
        PasswordResetToken resetToken = passwordResetTokenRepository.findByToken(token);
        if (resetToken != null && resetToken.getExpiryDate().isAfter(LocalDateTime.now())) {
            User user = resetToken.getUser();
            user.setPassword(passwordEncoder.encode(newPassword));
            userRepository.save(user);
            passwordResetTokenRepository.delete(resetToken);
            return true;
        }
        return false;
    }

    public void deleteAllUsers() {
        emailVerificationTokenRepository.deleteAllInBatch();
        passwordResetTokenRepository.deleteAllInBatch();
        userRepository.deleteAllInBatch();
    }
}
