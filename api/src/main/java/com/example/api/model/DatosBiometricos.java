package com.example.api.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DatosBiometricos {

    private String huella_digital_template;
    private String foto_perfil_url;
    private LocalDateTime fecha_registro_biometrico;
}
