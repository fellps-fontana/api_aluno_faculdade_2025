package com.api.alunos.dtos;


import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class AlunoDto {
    @NotBlank(message = "O nome do produto é obrigatorio")
    private String nome;
    @NotNull(message = "A idade é obrigatório")
    @Min(value = 1, message = "A idade precisa ser maior que zero")
    private int idade;
    private String curso;
    private String telefone;
}

