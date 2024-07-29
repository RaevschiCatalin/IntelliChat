package io.ctif.proiect;

import io.ctif.proiect.config.WebClientConfig;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;



@RestController
@SpringBootApplication

public class ProiectApplication {
    private static final Logger log = LoggerFactory.getLogger(ProiectApplication.class);
    @Autowired
    private WebClientConfig webClientConfig;

    @GetMapping
    public String hello(){
        log.info("URL: {}", webClientConfig.getUrl());
        return "Hello World"+ webClientConfig.getUrl();
    }


    public static void main(String[] args) {
        SpringApplication.run(ProiectApplication.class, args);
    }

}
