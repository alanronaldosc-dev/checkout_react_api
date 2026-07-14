package com.example.api.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class InfoVerificacion {

    private String metodo;        // ej: "huella", "manual", "tarjeta"
    private String resultado;     // ej: "exitoso", "fallido"
    private String observaciones;
}
