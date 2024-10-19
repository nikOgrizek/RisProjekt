package com.primer.ris;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.Properties;

@SpringBootApplication
public class RisApplication {

	public static void main(String[] args) {
		SpringApplication.run(RisApplication.class, args);
	}

}