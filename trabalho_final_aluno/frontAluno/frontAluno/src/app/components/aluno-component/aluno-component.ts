import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AlunoService } from '../../service/aluno-service';
import { AlunoModel } from '../../models/aluno-model';
import { Subscription } from 'rxjs'; 
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-aluno-component',
  standalone: true,
  imports: [FormsModule, CommonModule], 
  templateUrl: './aluno-component.html',
  styleUrl: './aluno-component.css'
})
export class AlunoComponent implements OnInit, OnDestroy { 
  
  private service = inject(AlunoService);
  private subscriptions = new Subscription(); 

  alunos: AlunoModel[] = [];
  
  novoAluno: Partial<AlunoModel> = { 
    nome: '', 
    curso: '', 
    telefone: '', 
    idade: '' 
  }; 
  
  alunoEmEdicao: AlunoModel | null = null;
  
  erro: string | null = null; 
  sucesso: string | null = null;
  loading = false;

  ngOnInit() {
    this.carregarAlunos();
  }

  private carregarAlunos(){
    this.loading = true;
    this.limparMensagens();

    const sub = this.service.listar()
      .subscribe({
        next: alunos => {
          this.alunos = alunos;
          this.loading = false;
        },
        error: e => {
          this.erro = e.message; 
          this.loading = false;
        }
      });
      
    this.subscriptions.add(sub);
  }

  adicionar(): void {
    this.limparMensagens();

    // Validação de NOME e CURSO para adição
    if (!this.novoAluno.nome) {
        this.erro = "O campo NOME é obrigatório.";
        return;
    }
    
    if (!this.novoAluno.curso) {
        this.erro = "O campo CURSO é obrigatório.";
        return;
    }
    
    // Preparação do payload (Telefone e Idade são opcionais)
    const payload: AlunoModel = {
        id: this.novoAluno.id || '',
        nome: this.novoAluno.nome,
        curso: this.novoAluno.curso,
        telefone: this.novoAluno.telefone || '', 
        idade: this.novoAluno.idade || ''
    };


    this.loading = true;
    const sub = this.service.adicionar(payload).subscribe({
      next: (alunoSalvo) => {
        this.sucesso = `Aluno ${alunoSalvo.nome} salvo com sucesso!`;
        this.loading = false;
        
        this.novoAluno = { nome: '', curso: '', telefone: '', idade: '' };
        this.carregarAlunos(); 

        this.resetMensagemSucesso();
      },
      error: (e) => {
        this.erro = e.message || "Falha ao salvar o aluno";
        this.loading = false;
      }
    });
    
    this.subscriptions.add(sub);
  }
  
  // O restante dos métodos permanece inalterado...
  remover(id: string): void {
    this.limparMensagens();
    if (!confirm('Tem certeza que deseja apagar este aluno? Esta ação é irreversível.')) return;

    this.loading = true;
    
    const sub = this.service.remover(id).subscribe({
      next: (message: string) => {
        this.sucesso = message || "Aluno apagado com sucesso!";
        this.carregarAlunos(); 
        this.resetMensagemSucesso();
      },
      error: e => {
        this.erro = e.message || "Falha ao apagar o aluno.";
        this.loading = false;
      }
    });
    
    this.subscriptions.add(sub);
  }

  salvarEdicao(): void { 
    // 1. Valida se há item para edição
    if (!this.alunoEmEdicao?.id) {
      this.erro = "Nenhum aluno selecionado para edição.";
      return;
    }
    
    // 2. Validação de campos obrigatórios no modal (Edição)
    if (!this.alunoEmEdicao.nome) {
        this.erro = "O campo NOME é obrigatório na edição.";
        return;
    }

    if (!this.alunoEmEdicao.curso) {
        this.erro = "O campo CURSO é obrigatório na edição.";
        return;
    }
    
    // Garantir que campos opcionais vazios sejam strings vazias, não nulos
    // Isso evita problemas de tipo no backend, especialmente em formulários de edição.
    if (this.alunoEmEdicao.telefone === null) this.alunoEmEdicao.telefone = '';
    if (this.alunoEmEdicao.idade === null) this.alunoEmEdicao.idade = '';


    this.loading = true;
    this.limparMensagens();

    const sub = this.service.editar(this.alunoEmEdicao.id, this.alunoEmEdicao).subscribe({
      next: result => {
        this.sucesso = 'Aluno atualizado com sucesso!';
        this.carregarAlunos();
        this.alunoEmEdicao = null; // Fechar o formulário/modal de edição
        this.resetMensagemSucesso();
      },
      error: e => {
        this.erro = e.message || "Falha ao editar o aluno";
        this.loading = false;
      }
    });
    
    this.subscriptions.add(sub);
  }
  
  

  iniciarEdicao(aluno: AlunoModel): void {
    this.alunoEmEdicao = { ...aluno }; 
    this.limparMensagens();
  }


  limparMensagens(): void {
    this.erro = null;
    this.sucesso = null;
  }

  private resetMensagemSucesso(): void {
      this.loading = false;
      setTimeout(() => this.sucesso = null, 3000);
  }


  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
