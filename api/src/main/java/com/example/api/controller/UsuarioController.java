package com.example.api.controller;

import com.example.api.dto.UsuarioDTO;
import com.example.api.service.UsuarioService;
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
@RequestMapping("/api/v1/usuarios")
@RequiredArgsConstructor
@Tag(name = "Usuarios", description = "Operaciones CRUD para la colección Usuarios")
public class UsuarioController {

    private final UsuarioService usuarioService;

    @Operation(summary = "Consultar todos los usuarios", description = "Retorna la lista completa de usuarios. Opcionalmente filtra por nombre.")
    @ApiResponse(responseCode = "200", description = "Lista obtenida correctamente")
    @GetMapping
    public ResponseEntity<List<UsuarioDTO>> getAll(
            @Parameter(description = "Nombre o parte del nombre para filtrar")
            @RequestParam(required = false) String nombre) {
        if (nombre != null && !nombre.isBlank()) {
            return ResponseEntity.ok(usuarioService.findByNombre(nombre));
        }
        return ResponseEntity.ok(usuarioService.findAll());
    }

    @Operation(summary = "Consultar usuario por ID")
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "Usuario encontrado"),
        @ApiResponse(responseCode = "404", description = "Usuario no encontrado")
    })
    @GetMapping("/{id}")
    public ResponseEntity<UsuarioDTO> getById(
            @Parameter(description = "ID del usuario en MongoDB") @PathVariable String id) {
        return ResponseEntity.ok(usuarioService.findById(id));
    }

    @Operation(summary = "Alta de usuario", description = "Crea un nuevo usuario en la colección Usuarios")
    @ApiResponses({
        @ApiResponse(responseCode = "201", description = "Usuario creado"),
        @ApiResponse(responseCode = "400", description = "Datos inválidos")
    })
    @PostMapping
    public ResponseEntity<UsuarioDTO> create(@Valid @RequestBody UsuarioDTO dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(usuarioService.create(dto));
    }

    @Operation(summary = "Modificación de usuario", description = "Actualiza los datos de un usuario existente")
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "Usuario actualizado"),
        @ApiResponse(responseCode = "404", description = "Usuario no encontrado")
    })
    @PutMapping("/{id}")
    public ResponseEntity<UsuarioDTO> update(
            @Parameter(description = "ID del usuario") @PathVariable String id,
            @Valid @RequestBody UsuarioDTO dto) {
        return ResponseEntity.ok(usuarioService.update(id, dto));
    }

    @Operation(summary = "Baja de usuario", description = "Elimina un usuario de la colección")
    @ApiResponses({
        @ApiResponse(responseCode = "204", description = "Usuario eliminado"),
        @ApiResponse(responseCode = "404", description = "Usuario no encontrado")
    })
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(
            @Parameter(description = "ID del usuario") @PathVariable String id) {
        usuarioService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
