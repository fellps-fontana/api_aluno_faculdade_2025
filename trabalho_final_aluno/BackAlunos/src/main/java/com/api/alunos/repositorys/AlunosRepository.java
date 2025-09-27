package com.api.alunos.repositorys;

import com.api.alunos.models.AlunoModel;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface AlunosRepository extends JpaRepository<AlunoModel, UUID> {
}
