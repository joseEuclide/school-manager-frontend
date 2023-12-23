import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DetalhesAluno } from 'src/app/model/aluno/DetalhesAluno/DetalhesAluno';
import { Nota } from 'src/app/model/aluno/Nota/nota.interface';
import { NotaDTO3 } from 'src/app/model/aluno/NotaDTO3/notaDTO3.interface';
import { Pagamento } from 'src/app/model/aluno/Pagamento/pagamento.interface';
import { AdminService } from 'src/app/shared/admin-service/admin.service';
import { AlunoService } from 'src/app/shared/aluno-service/AlunoService.service';
import { LocalStorageService } from 'src/app/shared/localstorageService/LocalStorage.service';

@Component({
  selector: 'app-aluno',
  templateUrl: './aluno.component.html',
  styleUrls: ['./aluno.component.css']
})
export class AlunoComponent implements OnInit{


  inicio : boolean = false
  notas : boolean = false
  pagamentos : boolean = false

  notas2 : Nota[] = []
  aluno!: DetalhesAluno;
  pagamento! : Pagamento

  idAluno :  number = 0 
  idTurma :  number = 0 
  nome : string = ""



  constructor(private router: Router,
    private alunoService: AlunoService,
    private adminService: AdminService,
    private detalhesAluno: DetalhesAluno,
    private localStorage : LocalStorageService
    ) {
      this.aluno = new DetalhesAluno();
      
    }
 
    get notasDoAluno(): Nota[] {
      return this.detalhesAluno.notas;
    }
  
    set notasDoAluno(notas: Nota[]) {
      this.detalhesAluno.notas = notas;
    }

    get pagamentosDoAluno(): Pagamento {
      return this.detalhesAluno.pagamento;
    }
  
    set pagamentosDoAluno(pagamento: Pagamento) {
      this.detalhesAluno.pagamento = pagamento;
    }

  ngOnInit(): void {
    // Inicialize a variável 'inicio' obtendo seu valor do serviço ao iniciar o componente
    this.inicio = true
    this.notas = false
    this.pagamentos = false

    this.idAluno = this.localStorage.getIntItem("idAluno") || 0
    this.idAluno = this.localStorage.getIntItem("idTurma") || 0
    this.nome = localStorage.getItem("nome") || ""
    
    // Use a chave para recuperar o valor do localStorage
    // Recuperar o valor do localStorage
     /*
      var idAluno = localStorage.getItem("idAluno");
      var idTurma = localStorage.getItem("idTurma");

      // Verificar se idAluno não é null antes de converter para um número
      var valorInteiro1;
      var valorInteiro2;

      if (idAluno !== null && idTurma !== null) {
          valorInteiro1 = parseInt(idAluno, 10); // O segundo argumento (radix) é opcional, mas é uma boa prática fornecer
          valorInteiro2 = parseInt(idTurma, 10); // O segundo argumento (radix) é opcional, mas é uma boa prática fornecer
      
        } else {
          // Tratar o caso em que idAluno é null (se necessário)
          valorInteiro1 = 0; // Ou qualquer outro valor padrão que faça sentido no seu contexto
          valorInteiro2 = 0;
        }
        */


  }

    
  aoClicar(valor: string): void {
    if (valor === 'inicio'){
      this.inicio = true
      this.notas = false
      this.pagamentos = false

       
    }else  if (valor === 'ver'){
      this.inicio = false
      this.notas = false
      this.pagamentos = false
      
    }else  if (valor === 'notas'){
      this.inicio = false
      this.notas = true
      this.pagamentos = false
    
    }else  if (valor === 'pagamentos'){
      this.inicio = false
      this.notas = false
      this.pagamentos = true
    
    }else  if (valor === 'sair'){
      this.inicio = false
      this.notas = false
      this.pagamentos = false
      

      this.router.navigate(['/']);
    }
  }
}
