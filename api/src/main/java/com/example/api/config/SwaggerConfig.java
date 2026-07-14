package com.example.api.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SwaggerConfig {

    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("API Usuarios - Checkout")
                        .version("1.0.0")
                        .description("CRUD completo para la colección Usuarios en MongoDB")
                        .contact(new Contact()
                                .name("UTVT - Noveno")
                                .email("contacto@example.com")));
    }
}
