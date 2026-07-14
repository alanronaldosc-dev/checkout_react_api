package com.example.api.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DetallesLaborales {

    private String departamento;
    private String puesto;
    private String nomina_matricula;
}
