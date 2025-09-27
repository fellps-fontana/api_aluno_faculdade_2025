import { Routes } from '@angular/router';
import { AlunoComponent } from './components/aluno-component/aluno-component';
import { HomeComponent } from './components/home-component/home-component';

export const routes: Routes = [
  {
    path: 'alunos',
    component: AlunoComponent
  },
  
  {
    path: 'home',
    component: HomeComponent
  }


  

];