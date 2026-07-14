package com.example.api.repository;

import com.example.api.model.Asistencia;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface AsistenciaRepository extends MongoRepository<Asistencia, String> {

    List<Asistencia> findByUsuarioId(String usuarioId);

    List<Asistencia> findByFecha(String fecha);

    List<Asistencia> findByTipoRegistro(String tipoRegistro);

    List<Asistencia> findByEstadoAsistencia(String estadoAsistencia);
}
