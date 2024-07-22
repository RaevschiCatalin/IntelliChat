package io.ctif.proiect.repository;


import io.ctif.proiect.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface Repository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);
    Optional<User> findByEmail(String email);
}
