package com.api.alunos.dtos;


import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class AlunoDto {
    @NotBlank(message = "O nome do produto é obrigatorio")
    private String nome;
    @NotNull(message = "O curso+ é obrigatório ")
    private String curso;
    private int idade;
    private String telefone;
}

