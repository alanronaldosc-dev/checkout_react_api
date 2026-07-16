package com.example.api.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class LoginResponse {

    private String id;
    private String nombre;
    private String apellidos;
    private String correo;
    private String tipoUsuario;
}
