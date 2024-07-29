package io.ctif.proiect;

import io.ctif.proiect.config.WebClientConfig;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;



@RestController
@SpringBootApplication

public class ProiectApplication {
    @Autowired
    private WebClientConfig webClientConfig;

    @GetMapping
    public String hello(){
        return "Hello World"+webClientConfig.getUrl();
    }


    public static void main(String[] args) {
        SpringApplication.run(ProiectApplication.class, args);
    }

}
