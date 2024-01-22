import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/shared/admin-service/admin.service';
import { Curso } from '../../dashboard/model/curso';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { SecretariaService } from 'src/app/shared/secretaria-service/SecretariaService.service';
import { SecretariaModel } from 'src/app/model/secretaria/secretaria.interface';


interface Turma {
  id:number;
  nome: String;
  disciplinas:String[];
  
}

@Component({
  selector: 'app-secretaria-accoes',
  templateUrl: './secretaria-accoes.component.html',
  styleUrls: ['./secretaria-accoes.component.css']
})
export class SecretariaAccoesComponent implements OnInit {

  selectedCurso!: number 
  selectedTurma!: number 
  selectedNivel: string = ""
  selectedTurno: string = ""
  cursos2: Curso[] = [];
  cursos: number[]=[]
  turnos: string[]=[]
  niveis: string[]=[]
  mostrarTurmas = false
  turmas :Turma[] = [];
  mostrar1 = true
  mostrar2 = false
  sucesso = false
  nome : string =""
  bi : string = ""
  relatorio! : SecretariaModel
  mensagem = ""

  constructor(private adminService: AdminService,
    
    private secretariaService: SecretariaService) { }

  ngOnInit(): void {
    this.adminService.getCursos().subscribe(cursos => {
      this.cursos2 = cursos;
    });
    this.mostrarTurmas = false
    this.mostrar1 = true
    this.mostrar2 = false
    this.sucesso = false
  }

 
  pesquisar() {
 
    if((this.selectedCurso != 0) && (this.selectedNivel != null || this.selectedNivel != "") && (this.selectedTurno != null || this.selectedTurno != "")){

      // Criar Listas para cursos, turnos e niveis
      this.cursos.push(this.selectedCurso)
      this.turnos.push(this.selectedTurno)
      this.niveis.push(this.selectedNivel)
   

    
      // Exibir no console
      console.log("this.selectedCurso: ",this.selectedCurso)
      console.log("cursos:", this.cursos);
      console.log("turnos:", this.turnos);
      console.log("Niveis", this.niveis);
    }
    
      


  
    if (this.cursos != null && this.turnos != null && this.niveis != null) {
       

      console.log('Filtragem de Turmas:',this.cursos,this.turnos,this.niveis);
      this.adminService.getProf2(this.cursos,this.niveis,this.turnos)
        .pipe(
          map((response) => {+
            console.log('Turmas Filtradas:', response);
            // Adicione aqui qualquer ação adicional após o cadastro.
            

            if(response != null){
              this.mostrarTurmas = true
              this.turmas = response
              this.mostrar2 = true
              this.mostrar1 = false
            }else{  
              this.mostrarTurmas = false
              this.mostrar1 = true
              this.mostrar2 = false
            }
            
          }),
          catchError(error => {
            console.error('Erro ao Filtrar as Turmas:', error);
            // Trate os erros de requisição, se necessário.
            return throwError(() => new Error(error)); // Throw new Error
          }) 
        )
        .subscribe();
    } else {
      console.log('Formulário inválido. Verifique os campos.');
    }
    this.selectedCurso=0
    this.selectedNivel= ""
    this.selectedTurno = ""
  }


  matricular() {
 
   
    if (this.selectedTurma != 0 && this.bi !=null && this.nome != null  ) {
       

      const aluno = {
        "nome": this.nome,
        "bi":   this.bi
      }
      console.log('Aluno: ',aluno);
      console.log("idTurma: ", this.selectedTurma)
      this.secretariaService.matricularAluno(this.selectedTurma,aluno)
        .pipe(
          map((response) => {+
            console.log('Resultado da Matricula:', response);
            // Adicione aqui qualquer ação adicional após o cadastro.
            

            if(response != null){
              this.mensagem = "Aluno Cadastrao Com Sucesso !"
              
            }else{
              this.mensagem = "Não Foi Possivel Cadastrar o Aluno Por Problemas técnicos !"
            }
            this.mostrarTurmas = false
            this.relatorio = response
            this.mostrar2 = false
            this.mostrar1 = true
            this.sucesso = true
            
          }),
          catchError(error => {
            console.error('Falha ao Fazer a matricula:', error);
            // Trate os erros de requisição, se necessário.
            return throwError(() => new Error(error)); // Throw new Error
          }) 
        )
        .subscribe();
    } else {
      console.log('Formulário inválido. Verifique os campos.');
    }

    this.selectedCurso = 0
    this.selectedCurso = 0
    this.selectedTurno = ""
  }

}
