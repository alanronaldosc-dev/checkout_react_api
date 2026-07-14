package com.example.api.dto;

import com.example.api.model.InfoVerificacion;
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
public class AsistenciaDTO {

    private String id;

    @NotBlank(message = "El usuario_id es obligatorio")
    private String usuarioId;

    private String fecha;

    private String tipoRegistro;

    private LocalDateTime timestamp;

    private InfoVerificacion verificacion;

    private String estadoAsistencia;
}
