package com.souvik.app;

import javax.crypto.spec.SecretKeySpec;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class AppApplication {

	private static SecretKeySpec secretKey;
	private static byte[] key;

	public static void main(String[] args) {
		SpringApplication.run(AppApplication.class, args);
	}
}
