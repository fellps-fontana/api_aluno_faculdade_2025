package com.api.alunos.models;

import jakarta.persistence.*;
import lombok.Data;

import java.util.UUID;

@Entity
@Data
@Table(name = "tb_alunos")
public class AlunoModel {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;
    private String nome;
    private int idade;
    private String curso;
    private String telefone;


}
