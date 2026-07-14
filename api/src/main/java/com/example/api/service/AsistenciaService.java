package com.example.api.service;

import com.example.api.dto.AsistenciaDTO;
import com.example.api.exception.ResourceNotFoundException;
import com.example.api.model.Asistencia;
import com.example.api.repository.AsistenciaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AsistenciaService {

    private final AsistenciaRepository asistenciaRepository;

    public List<AsistenciaDTO> findAll() {
        return asistenciaRepository.findAll()
                .stream()
                .map(this::toDTO)
                .toList();
    }

    public AsistenciaDTO findById(String id) {
        return asistenciaRepository.findById(id)
                .map(this::toDTO)
                .orElseThrow(() -> new ResourceNotFoundException("Asistencia no encontrada con id: " + id));
    }

    public List<AsistenciaDTO> findByUsuarioId(String usuarioId) {
        return asistenciaRepository.findByUsuarioId(usuarioId)
                .stream()
                .map(this::toDTO)
                .toList();
    }

    public List<AsistenciaDTO> findByFecha(String fecha) {
        return asistenciaRepository.findByFecha(fecha)
                .stream()
                .map(this::toDTO)
                .toList();
    }

    // Registro desde el checador: asigna timestamp y fecha automáticamente
    public AsistenciaDTO registrar(AsistenciaDTO dto) {
        Asistencia asistencia = toEntity(dto);
        LocalDateTime ahora = LocalDateTime.now();
        asistencia.setTimestamp(ahora);
        asistencia.setFecha(ahora.format(DateTimeFormatter.ofPattern("yyyy-MM-dd")));
        return toDTO(asistenciaRepository.save(asistencia));
    }

    public AsistenciaDTO update(String id, AsistenciaDTO dto) {
        Asistencia existing = asistenciaRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Asistencia no encontrada con id: " + id));

        existing.setUsuarioId(dto.getUsuarioId());
        existing.setFecha(dto.getFecha());
        existing.setTipoRegistro(dto.getTipoRegistro());
        existing.setVerificacion(dto.getVerificacion());
        existing.setEstadoAsistencia(dto.getEstadoAsistencia());

        return toDTO(asistenciaRepository.save(existing));
    }

    public void delete(String id) {
        if (!asistenciaRepository.existsById(id)) {
            throw new ResourceNotFoundException("Asistencia no encontrada con id: " + id);
        }
        asistenciaRepository.deleteById(id);
    }

    private AsistenciaDTO toDTO(Asistencia a) {
        return AsistenciaDTO.builder()
                .id(a.getId())
                .usuarioId(a.getUsuarioId())
                .fecha(a.getFecha())
                .tipoRegistro(a.getTipoRegistro())
                .timestamp(a.getTimestamp())
                .verificacion(a.getVerificacion())
                .estadoAsistencia(a.getEstadoAsistencia())
                .build();
    }

    private Asistencia toEntity(AsistenciaDTO dto) {
        return Asistencia.builder()
                .usuarioId(dto.getUsuarioId())
                .fecha(dto.getFecha())
                .tipoRegistro(dto.getTipoRegistro())
                .timestamp(dto.getTimestamp())
                .verificacion(dto.getVerificacion())
                .estadoAsistencia(dto.getEstadoAsistencia())
                .build();
    }
}
