package com.example.api.dto;

import com.example.api.model.DatosBiometricos;
import com.example.api.model.DetallesLaborales;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UsuarioDTO {

    private String id;

    @NotBlank(message = "El nombre es obligatorio")
    private String nombre;

    @NotBlank(message = "Los apellidos son obligatorios")
    private String apellidos;

    @NotBlank(message = "El correo es obligatorio")
    @Email(message = "El correo no tiene un formato válido")
    private String correo;

    private String tipoUsuario;
    private String estado;

    private DetallesLaborales detallesLaborales;
    private DatosBiometricos biometria;

    private LocalDateTime createdAt;
}
