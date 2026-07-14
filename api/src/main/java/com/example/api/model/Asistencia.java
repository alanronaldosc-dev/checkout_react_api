package com.example.api.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.time.LocalDateTime;

@Document(collection = "Asistencias")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Asistencia {

    @Id
    private String id;

    @Field("usuario_id")
    private String usuarioId;

    private String fecha;

    @Field("tipo_registro")
    private String tipoRegistro;       // ej: "entrada", "salida"

    private LocalDateTime timestamp;

    private InfoVerificacion verificacion;

    @Field("estado_asistencia")
    private String estadoAsistencia;   // ej: "a tiempo", "tardanza", "falta"
}
