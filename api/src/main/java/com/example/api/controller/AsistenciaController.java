package com.example.api.controller;

import com.example.api.dto.AsistenciaDTO;
import com.example.api.service.AsistenciaService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/asistencias")
@RequiredArgsConstructor
@Tag(name = "Asistencias", description = "Operaciones CRUD para la colección Asistencias")
public class AsistenciaController {

    private final AsistenciaService asistenciaService;

    @Operation(summary = "Consultar todas las asistencias", description = "Filtra opcionalmente por usuarioId o fecha")
    @ApiResponse(responseCode = "200", description = "Lista obtenida correctamente")
    @GetMapping
    public ResponseEntity<List<AsistenciaDTO>> getAll(
            @Parameter(description = "ID del usuario para filtrar")
            @RequestParam(required = false) String usuarioId,
            @Parameter(description = "Fecha en formato yyyy-MM-dd para filtrar")
            @RequestParam(required = false) String fecha) {

        if (usuarioId != null && !usuarioId.isBlank()) {
            return ResponseEntity.ok(asistenciaService.findByUsuarioId(usuarioId));
        }
        if (fecha != null && !fecha.isBlank()) {
            return ResponseEntity.ok(asistenciaService.findByFecha(fecha));
        }
        return ResponseEntity.ok(asistenciaService.findAll());
    }

    @Operation(summary = "Consultar asistencia por ID")
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "Asistencia encontrada"),
        @ApiResponse(responseCode = "404", description = "Asistencia no encontrada")
    })
    @GetMapping("/{id}")
    public ResponseEntity<AsistenciaDTO> getById(
            @Parameter(description = "ID de la asistencia") @PathVariable String id) {
        return ResponseEntity.ok(asistenciaService.findById(id));
    }

    @Operation(summary = "Registrar asistencia desde el checador",
               description = "Crea un registro de asistencia. El timestamp y la fecha se asignan automáticamente.")
    @ApiResponses({
        @ApiResponse(responseCode = "201", description = "Asistencia registrada"),
        @ApiResponse(responseCode = "400", description = "Datos inválidos")
    })
    @PostMapping
    public ResponseEntity<AsistenciaDTO> registrar(@Valid @RequestBody AsistenciaDTO dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(asistenciaService.registrar(dto));
    }

    @Operation(summary = "Modificar asistencia")
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "Asistencia actualizada"),
        @ApiResponse(responseCode = "404", description = "Asistencia no encontrada")
    })
    @PutMapping("/{id}")
    public ResponseEntity<AsistenciaDTO> update(
            @Parameter(description = "ID de la asistencia") @PathVariable String id,
            @Valid @RequestBody AsistenciaDTO dto) {
        return ResponseEntity.ok(asistenciaService.update(id, dto));
    }

    @Operation(summary = "Eliminar asistencia")
    @ApiResponses({
        @ApiResponse(responseCode = "204", description = "Asistencia eliminada"),
        @ApiResponse(responseCode = "404", description = "Asistencia no encontrada")
    })
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(
            @Parameter(description = "ID de la asistencia") @PathVariable String id) {
        asistenciaService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
