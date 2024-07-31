package io.ctif.proiect.controller;

import io.ctif.proiect.model.User;
import io.ctif.proiect.repository.Repository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;
import reactor.core.scheduler.Schedulers;

@RestController
@RequestMapping("api/users")
public class UserController {

    @Autowired
    private Repository userRepository;

    @GetMapping("/search")
    public Mono<ResponseEntity<User>> getUserByIdOrEmail(@RequestParam(required = false) String email) {
        if (email != null && !email.isEmpty()) {
            return Mono.fromCallable(() -> userRepository.findByEmail(email))
                    .subscribeOn(Schedulers.boundedElastic())
                    .map(optionalUser -> optionalUser
                            .map(user -> ResponseEntity.ok(user))
                            .orElse(ResponseEntity.notFound().build())
                    );
        } else {

            return Mono.just(ResponseEntity.badRequest().body(null));
        }
    }
}
