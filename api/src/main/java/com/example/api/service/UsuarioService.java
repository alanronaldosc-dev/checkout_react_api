package com.example.api.service;

import com.example.api.dto.UsuarioDTO;
import com.example.api.exception.ResourceNotFoundException;
import com.example.api.model.Usuario;
import com.example.api.repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class UsuarioService {

    private final UsuarioRepository usuarioRepository;

    public List<UsuarioDTO> findAll() {
        return usuarioRepository.findAll()
                .stream()
                .map(this::toDTO)
                .toList();
    }

    public UsuarioDTO findById(String id) {
        return usuarioRepository.findById(id)
                .map(this::toDTO)
                .orElseThrow(() -> new ResourceNotFoundException("Usuario no encontrado con id: " + id));
    }

    public List<UsuarioDTO> findByNombre(String nombre) {
        return usuarioRepository.findByNombreContainingIgnoreCase(nombre)
                .stream()
                .map(this::toDTO)
                .toList();
    }

    public UsuarioDTO create(UsuarioDTO dto) {
        Usuario usuario = toEntity(dto);
        usuario.setCreatedAt(LocalDateTime.now());
        return toDTO(usuarioRepository.save(usuario));
    }

    public UsuarioDTO update(String id, UsuarioDTO dto) {
        Usuario existing = usuarioRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Usuario no encontrado con id: " + id));

        existing.setNombre(dto.getNombre());
        existing.setApellidos(dto.getApellidos());
        existing.setCorreo(dto.getCorreo());
        existing.setTipoUsuario(dto.getTipoUsuario());
        existing.setEstado(dto.getEstado());
        existing.setDetallesLaborales(dto.getDetallesLaborales());
        existing.setBiometria(dto.getBiometria());

        return toDTO(usuarioRepository.save(existing));
    }

    public void delete(String id) {
        if (!usuarioRepository.existsById(id)) {
            throw new ResourceNotFoundException("Usuario no encontrado con id: " + id);
        }
        usuarioRepository.deleteById(id);
    }

    private UsuarioDTO toDTO(Usuario u) {
        return UsuarioDTO.builder()
                .id(u.getId())
                .nombre(u.getNombre())
                .apellidos(u.getApellidos())
                .correo(u.getCorreo())
                .tipoUsuario(u.getTipoUsuario())
                .estado(u.getEstado())
                .detallesLaborales(u.getDetallesLaborales())
                .biometria(u.getBiometria())
                .createdAt(u.getCreatedAt())
                .build();
    }

    private Usuario toEntity(UsuarioDTO dto) {
        return Usuario.builder()
                .nombre(dto.getNombre())
                .apellidos(dto.getApellidos())
                .correo(dto.getCorreo())
                .tipoUsuario(dto.getTipoUsuario())
                .estado(dto.getEstado())
                .detallesLaborales(dto.getDetallesLaborales())
                .biometria(dto.getBiometria())
                .build();
    }
}
