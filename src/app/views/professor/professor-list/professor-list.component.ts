import { Component, OnInit } from '@angular/core';
import { ProfessorModel } from 'src/app/model/professor/professor.interface';
import { AdminService } from 'src/app/shared/admin-service/admin.service';
import { ProfessorService } from 'src/app/shared/professor/ProfessorService.service';

import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { LocalStorageService } from 'src/app/shared/localstorageService/LocalStorage.service';

@Component({
  selector: 'app-professor-list',
  templateUrl: './professor-list.component.html',
  styleUrls: ['./professor-list.component.css']
})
export class ProfessorListComponent implements OnInit{

  mostrarTurmas = true
  lancarNotas1 =  false
  verNotas1 =  false
  verNotas2 =  false
  verNotas0 =  false
  idProf!: number | null;
  idTurmaActual! : number
  idProfActual! : number
  prof! : ProfessorModel[]
  verMensagem = false
  verNotass = false
  mensagem! : string
  verModal = false
  sucesso = false

  turmas : ProfessorModel[] = [];
  turmas2! : ProfessorModel[]

  alunos : ProfessorModel[] = [];
  alunos2! : ProfessorModel[]

  disciplinas : ProfessorModel[] = [];
  disciplinas2! : ProfessorModel[]

  disciplinaEscolhida!: number 


  constructor(private adminService: AdminService,
    
    private professorService: ProfessorService,
    private localStorage : LocalStorageService) { }
  

  ngOnInit(): void {

    this.idProf = this.recuperarIdProf();
      if((this.idProf !== null ) || 
         (this.idProf !== 0 )){
          const idProfNotNull = this.idProf !== null ? this.idProf : 0;
          this.idProfActual = idProfNotNull

          console.log("=======>  this.idProfActual: ",this.idProfActual," <============")
          //converter idAlunoNotNull de String para Int
          const idProf = this.localStorage.getIntItem("id") || 0
          this.professorService.getTurmas(idProf).subscribe(turmas => {
            this.turmas = turmas;
        });


        this.mostrarTurmas = true
        this.lancarNotas1 = false
        this.verNotas0 =  false
        this.verNotas1 = false
        this.verNotas2 = false
        this.verMensagem = false
        this.verModal = false
        this.sucesso = false
  }
  }

  lancarNotas(idTurma: number) {
    // Lógica para lançar notas da turma
      console.log('Lançar notas da turma:', idTurma);
      // Implemente a lógica real aqui
      this.mostrarTurmas = false
      this.lancarNotas1 = true
      this.verNotas0 =  false
      this.verNotas1 = false
      this.verNotas2 = false
      this.verMensagem = false
      this.verModal = false
      this.idTurmaActual = idTurma

      this.idProf = this.recuperarIdProf();  
        if((this.idProf !== null ) || 
          (this.idProf !== 0 )){
            const idProfNotNull = this.idProf !== null ? this.idProf : 0;
            

          this.professorService.getAlunosDaTurma(idTurma).subscribe(alunos => {
            this.alunos = alunos;
          });
          const idProf = this.localStorage.getIntItem("id") || 0
          this.professorService.getDisciplinas(idProf,idTurma).subscribe(disciplinas => {
            this.disciplinas = disciplinas;
          });


    }
  }
  lancarNotas2() {
    // Lógica para lançar notas da turma
    console.log('this.alunos:', this.alunos);
    // Implemente a lógica real aqui
    

    //this.idProfActual, this.idTurmaActual, this.disciplinaEscolhida
      const notasLancadas = this.alunos.map(aluno => {
        return { idAluno: aluno.id, notaDoAluno: aluno.nota };
      });
      this.idProfActual = this.localStorage.getIntItem("id") || 0
  
      console.log("this.idTurmaActual: "+this.idTurmaActual+" this.idProfActual: "+this.idProfActual+" this.disciplinaEscolhida: "+this.disciplinaEscolhida)
      console.log(`Notas lançadas para a disciplina ${this.disciplinaEscolhida}:`, notasLancadas);
      // Implemente a lógica real aqui, como enviar as notas para o servidor, etc.
      
              
      
        this.professorService.saveLancarProvas(this.idTurmaActual,this.idProfActual,this.disciplinaEscolhida,notasLancadas)
        .pipe(
          map((response) => {
            console.log('Resultado do Lancamento de Provas: ', response);
            // Adicione aqui qualquer ação adicional após o cadastro.
            
            if(response.prof != null){

            
              this.verNotass = true
              
              console.log("=======================>    response.mensagem: ",response.mensagem)
              console.log("=======================>    mensagem: ",this.mensagem)
              

            }
              this.alunos = response.prof
              this.mensagem = response.mensagem
              this.verMensagem = true
              this.sucesso = true


            this.mostrarTurmas = true
            this.verModal = false
            this.lancarNotas1 = false
            this.verNotas0 =  false
            this.verNotas1 = false
            this.verNotas2 = false
            
          }),
          catchError(error => {
            console.error('Erro Ao Lançar As Notas:', error);
            // Trate os erros de requisição, se necessário.

            this.mensagem = "Erro Ao Lançar As Notas, Tente Novamente Mais Tarde"
            this.mostrarTurmas = true
            this.lancarNotas1 = false
            this.verNotas0 =  false
            this.verNotas1 = false
            this.verNotas2 = false
            this.verNotass = false
            this.verMensagem = false
            this.verModal = false
            return throwError(() => new Error(error)); // Throw new Error
          }) 
        )
        .subscribe();
      
    } 

    
  
  verNotas(turma: any) {
    // Lógica para visualizar notas da turma
    console.log('Ver notas da turma:', turma);
    // Implemente a lógica real aqui
    this.mostrarTurmas = false
    this.lancarNotas1 = false
    this.verNotas0 =  true
    this.verNotas1 = true
    this.verNotas2 = false
    this.verMensagem = false
    this.verNotass = false
    this.verModal = false
  }
  seguinte() {
    // Lógica para visualizar notas da turma
    // Implemente a lógica real aqui
    this.mostrarTurmas = false
    this.lancarNotas1 = false
    this.verNotas0 =  true
    this.verNotas1 = false
    this.verNotas2 = true
    this.verMensagem = false
    this.verNotass = false
    this.verMensagem = false
  }
  voltar(turma: any) {
    // Lógica para visualizar notas da turma
    console.log('Ver notas da turma:', turma);
    // Implemente a lógica real aqui
    this.mostrarTurmas = true
    this.lancarNotas1 = false
    this.verNotas0 =  true
    this.verNotas1 = false
    this.verNotas2 = false
    this.verMensagem = false
    this.verNotass = false
    this.verModal = false
  }

  recuperarIdProf(): number | null {
    const valor = localStorage.getItem('idProf');
    return valor !== null ? parseInt(valor, 10) : null;
  }

  exibirNotas(){
    this.verModal = true
    this.mostrarTurmas = false
    this.lancarNotas1 = false
    this.verNotas0 =  true
    this.verNotas1 = false
    this.verNotas2 = false
    this.verMensagem = false
    this.verNotass = false
  

  }

  close(){
    this.verModal = false
    this.mostrarTurmas = true
    this.lancarNotas1 = false
    this.verNotas0 =  false
    this.verNotas1 = false
    this.verNotas2 = false
    this.verMensagem = false
    this.verNotass = false
    this.verNotass = false
  }

  contador(numero : Number) : Number{
     var contador = 0
     var numero2 = 0
     
     var estado = true
     sair:
     while(estado){
       ++contador;
       if(contador === numero){
          numero2 = contador
          estado = false
          break sair;
       }
     }
     console.log("ExTRURA DE REPETICAO: ")
     console.log("Resultado: ",numero2)
     return numero2
  }

 






}
