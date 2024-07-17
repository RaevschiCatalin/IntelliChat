package io.ctif.proiect.repository;


import io.ctif.proiect.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface Repository extends JpaRepository<User, Long> {
}
