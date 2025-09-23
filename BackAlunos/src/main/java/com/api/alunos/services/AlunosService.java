package com.api.alunos.services;
import com.api.alunos.dtos.AlunoDto;
import com.api.alunos.models.AlunoModel;
import com.api.alunos.repositorys.AlunosRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class AlunosService {
    private AlunosRepository alunosRepository;
    public AlunosService(AlunosRepository alunosRepository) {
        this.alunosRepository = alunosRepository;
    }

    public AlunoModel create(AlunoDto aluno) {
        AlunoModel alunoModel = new AlunoModel();
        alunoModel.setNome(aluno.getNome());
        alunoModel.setTelefone(aluno.getTelefone()
        );
        alunoModel.setIdade(aluno.getIdade());
        alunoModel.setCurso(aluno.getCurso());

        return alunosRepository.save(alunoModel);
    }

    public List<AlunoModel> findAll() {
        return alunosRepository.findAll();
    }

    public void deletar(UUID id) {
        AlunoModel existente = alunosRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Produto não encontrado"));
        alunosRepository.deleteById(existente.getId());
    }

    public AlunoModel atualizar(AlunoDto dto, UUID id) {
        AlunoModel existente = alunosRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Aluno não encontrado"));

        existente.setNome(dto.getNome());
        existente.setIdade(dto.getIdade());
        existente.setTelefone(dto.getTelefone());
        existente.setCurso(dto.getCurso());
        return alunosRepository.save(existente);
    }

}
