import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/shared/localstorageService/LocalStorage.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{


   inicio : boolean = false
   curso : boolean = false
   disciplina : boolean = false
   turma : boolean = false
   professor : boolean = false
   ver : boolean = false
   provas : boolean = false
   aulas : boolean = false
   pagar : boolean = false
   permissoes: boolean = false
   secretaria : boolean = false
   tesouraria : boolean = false
   precos : boolean = false
   id :  number = 0 
   nome : string = ""
 
  constructor(private router: Router,
              private localStorage : LocalStorageService) {}
  


  ngOnInit(): void {
    // Inicialize a variável 'inicio' obtendo seu valor do serviço ao iniciar o componente
    this.inicio = true
    this.curso = false
    this.disciplina  = false
    this.turma  = false
    this.professor = false
    this.ver = false
    this.provas = false
    this.aulas = false
    this.pagar = false
    this.permissoes = false
    this.secretaria = false
    this.tesouraria = false
    this.precos = false
    
    this.id = this.localStorage.getIntItem("id") || 0
    this.nome = localStorage.getItem("nome") || ""

  }

    
  aoClicar(valor: string): void {
    if (valor === 'inicio'){
      this.inicio = true
      this.curso = false
      this.disciplina  = false
      this.turma  = false
      this.professor = false
      this.ver = false
      this.provas = false
      this.aulas = false
      this.pagar = false
      this.permissoes = false
      this.secretaria = false
      this.tesouraria = false
      this.precos = false

       
    }else  if (valor === 'ver'){
      this.inicio = false
      this.curso = false
      this.disciplina  = false
      this.turma  = false
      this.professor = false
      this.ver = true
      this.provas = false
      this.aulas = false
      this.pagar = false
      this.permissoes = false
      this.secretaria = false
      this.tesouraria = false
      this.precos = false
    }else  if (valor === 'curso'){
      this.inicio = false
      this.curso = true
      this.disciplina  = false
      this.turma  = false
      this.professor = false
      this.ver = false
      this.provas = false
      this.aulas = false
      this.pagar = false
      this.permissoes = false
      this.secretaria = false
      this.tesouraria = false
      this.precos = false
    }else  if (valor === 'disciplina'){
      this.inicio = false
      this.curso = false
      this.disciplina  = true
      this.turma  = false
      this.professor = false
      this.ver = false
      this.provas = false
      this.aulas = false
      this.pagar = false
      this.permissoes = false
      this.secretaria = false
      this.tesouraria = false
      this.precos = false
    }else  if (valor === 'turma'){
      this.inicio = false
      this.curso = false
      this.disciplina  = false
      this.turma  = true
      this.professor = false
      this.ver = false
      this.provas = false
      this.aulas = false
      this.pagar = false
      this.permissoes = false
      this.secretaria = false
      this.tesouraria = false
      this.precos = false
    }else  if (valor === 'Professor'){
      this.inicio = false
      this.curso = false
      this.disciplina  = false
      this.turma  = false
      this.professor = true
      this.ver = false
      this.provas = false
      this.aulas = false
      this.pagar = false
      this.permissoes = false
      this.secretaria = false
      this.tesouraria = false
      this.precos = false
    }else  if (valor === 'tesouraria'){
      this.inicio = false
      this.curso = false
      this.disciplina  = false
      this.turma  = false
      this.professor = false
      this.ver = false
      this.provas = false
      this.aulas = false
      this.pagar = false
      this.permissoes = false
      this.secretaria = false
      this.tesouraria = true
      this.precos = false
    }else  if (valor === 'secretaria'){
      this.inicio = false
      this.curso = false
      this.disciplina  = false
      this.turma  = false
      this.professor = false
      this.ver = false
      this.provas = false
      this.aulas = false
      this.pagar = false
      this.permissoes = false
      this.secretaria = true
      this.tesouraria = false
      this.precos = false
    }else  if (valor === 'prova'){
      this.inicio = false
      this.curso = false
      this.disciplina  = false
      this.turma  = false
      this.professor = false
      this.ver = false
      this.provas = true
      this.aulas = false
      this.pagar = false
      this.permissoes = false
      this.secretaria = false
      this.tesouraria = false
      this.precos = false
    }else  if (valor === 'aula'){
      this.inicio = false
      this.curso = false
      this.disciplina  = false
      this.turma  = false
      this.professor = false
      this.ver = false
      this.provas = false
      this.aulas = true
      this.pagar = false
      this.permissoes = false
      this.secretaria = false
      this.tesouraria = false
      this.precos = false
    }else  if (valor === 'permissoes'){
      this.inicio = false
      this.curso = false
      this.disciplina  = false
      this.turma  = false
      this.professor = false
      this.ver = false
      this.provas = false
      this.aulas = false
      this.pagar = false
      this.permissoes = true
      this.secretaria = false
      this.tesouraria = false
      this.precos = false
    }else  if (valor === 'pagar'){
      this.inicio = false
      this.curso = false
      this.disciplina  = false
      this.turma  = false
      this.professor = false
      this.ver = false
      this.provas = false
      this.aulas = false
      this.pagar = true
      this.permissoes = false
      this.secretaria = false
      this.tesouraria = false
      this.precos = false
    }else  if (valor === 'precos'){
      this.inicio = false
      this.curso = false
      this.disciplina  = false
      this.turma  = false
      this.professor = false
      this.ver = false
      this.provas = false
      this.aulas = false
      this.pagar = false
      this.permissoes = false
      this.secretaria = false
      this.tesouraria = false
      this.precos = true
    }else  if (valor === 'sair'){
      this.inicio = false
      this.curso = false
      this.disciplina  = false
      this.turma  = false
      this.professor = false
      this.ver = false
      this.provas = false
      this.aulas = false
      this.pagar = false
      this.permissoes = false
      this.secretaria = false
      this.tesouraria = false
      this.precos = false

      this.router.navigate(['/']);
    }
  }
 
}
