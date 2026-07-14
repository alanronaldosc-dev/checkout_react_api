package com.example.api.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.time.LocalDateTime;

@Document(collection = "Usuarios")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Usuario {

    @Id
    private String id;

    private String nombre;
    private String apellidos;
    private String correo;

    @Field("tipo_usuario")
    private String tipoUsuario;

    private String estado;

    @Field("detalles_laborales")
    private DetallesLaborales detallesLaborales;

    @Field("biometria")
    private DatosBiometricos biometria;

    @Field("created_at")
    private LocalDateTime createdAt;
}
