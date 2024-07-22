package io.ctif.proiect.service;

import io.ctif.proiect.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import io.ctif.proiect.repository.Repository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private Repository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;


    public Optional<User> findUserByUsername(String username) {
        return userRepository.findByUsername(username);
    }
    public Optional<User> findUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public void userDetailsService() {
        return;
    }


    public UserDetails loadUserByUsername(String email) {
        return userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));
    }

    public boolean isUserEnabled(String email) {
        return userRepository.findByEmail(email)
                .map(user -> user.isEnabled())
                .orElse(false);
    }
}
