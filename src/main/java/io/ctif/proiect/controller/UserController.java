package io.ctif.proiect.controller;

import java.util.*;
import io.ctif.proiect.model.User;
import io.ctif.proiect.repository.Repository;
import io.ctif.proiect.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/users")
public class UserController {

    @Autowired
    private Repository userRepository;

    @GetMapping
    public List<User> getAllUsers(){
        return userRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id){
        Optional<User> user = userRepository.findById(id);
        if(user.isPresent()){
            return ResponseEntity.ok(user.get());
        }else{
            return ResponseEntity.notFound().build();
        }
    }
    @PostMapping
    public User createUser(@RequestBody User user){
        return userRepository.save(user);
    }
    @PutMapping("/{id}")
    public ResponseEntity<User> updateUser(@PathVariable Long id, @RequestBody User userDetails){
        Optional<User> user = userRepository.findById(id);
        if(user.isPresent()){
            User existingUser = user.get();
            existingUser.setUsername(userDetails.getUsername());
            existingUser.setEmail(userDetails.getEmail());
            userRepository.save(existingUser);
            return ResponseEntity.ok(existingUser);
        }else{
            return ResponseEntity.notFound().build();
        }
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<User> deleteUser(@PathVariable Long id){
        Optional<User> user = userRepository.findById(id);
        if(user.isPresent()){
            userRepository.delete(user.get());
            return ResponseEntity.ok(user.get());
        }else{
            return ResponseEntity.notFound().build();
        }
    }
    @GetMapping("/search")
    public ResponseEntity<?> getUserByIdOrEmail(@RequestParam(required = false) String email){
        if(email != null && !email.isEmpty()) {
            Optional<User> user = userRepository.findByEmail(email);
            return user.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
        } else {
            return ResponseEntity.badRequest().body("Email parameter is missing");
        }
    }
}
