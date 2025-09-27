package com.api.alunos.controllers;

import com.api.alunos.dtos.AlunoDto;
import com.api.alunos.models.AlunoModel;
import com.api.alunos.services.AlunosService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/alunos")
public class AlunosController {
    private final AlunosService alunosService;

    public AlunosController(AlunosService alunosService) {
        this.alunosService = alunosService;
    }

    @PostMapping("/salvar")
    public ResponseEntity<?> salvar(@RequestBody @Valid AlunoDto alunoDto) {
        AlunoModel produtoSalvo = alunosService.create(alunoDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(produtoSalvo);
    }

    @GetMapping("/listar")
    public List<AlunoModel> listar() {
        return alunosService.findAll();
    }


    @PostMapping("/editar/{id}")
    public ResponseEntity<?> editar(
            @RequestBody @Valid AlunoDto dto,
            @PathVariable(value = "id") UUID id
    ){
        try {
            AlunoModel alunoEditado = alunosService.atualizar(dto, id);
            return ResponseEntity.status(HttpStatus.CREATED).body(alunoEditado);
        }catch (Exception e){

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro");
        }
    }
    @PostMapping("/apagar/{id}")
    public ResponseEntity<String> apagar(@PathVariable(value="id")UUID id) {
        try{
            alunosService.deletar(id);
            return ResponseEntity.ok("Aluno apagado com sucesso!");
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("FUDEU");
        }
    }


}
