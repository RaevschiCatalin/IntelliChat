package io.ctif.proiect.service;

import io.ctif.proiect.exceptions.EmailExistsException;
import io.ctif.proiect.exceptions.UsernameExistsException;
import io.ctif.proiect.model.User;
import io.ctif.proiect.repository.Repository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.Optional;


@Slf4j
@Service
public class AuthenticationService {
    private final Repository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    @Autowired
    private EmailVerificationService emailVerificationService;

    @Autowired
    public AuthenticationService(Repository userRepository, PasswordEncoder passwordEncoder, JwtService jwtService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
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


    public void deleteAllUsers() {
        userRepository.deleteAllInBatch();
    }
}
