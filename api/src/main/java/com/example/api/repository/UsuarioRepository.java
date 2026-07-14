package com.example.api.repository;

import com.example.api.model.Usuario;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UsuarioRepository extends MongoRepository<Usuario, String> {

    List<Usuario> findByNombreContainingIgnoreCase(String nombre);

    Optional<Usuario> findByCorreo(String correo);

    List<Usuario> findByTipoUsuario(String tipoUsuario);

    List<Usuario> findByEstado(String estado);
}
