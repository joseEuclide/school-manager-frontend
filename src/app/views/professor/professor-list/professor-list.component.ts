import { Component, OnInit } from '@angular/core';
import { ProfessorModel } from 'src/app/model/professor/professor.interface';
import { AdminService } from 'src/app/shared/admin-service/admin.service';
import { ProfessorService } from 'src/app/shared/professor/ProfessorService.service';

import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';

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

  turmas : ProfessorModel[] = [
    { id: 1, nome: 'Turma A', curso: 'Ciências da Computação', nivel: 'Graduação', turno: 'Manhã',nota:0 },
    { id: 2, nome: 'Turma B', curso: 'Engenharia Elétrica', nivel: 'Graduação', turno: 'Tarde',nota:0 },
    { id: 3, nome: 'Turma C', curso: 'Administração', nivel: 'Pós-graduação', turno: 'Noite',nota:0 }
    // Adicione mais turmas conforme necessário
  ];
  turmas2! : ProfessorModel[]

  alunos : ProfessorModel[] = [
    { id: 1, nome: 'João Silva', nota: 0,curso :"",turno:"",nivel :"" },
    { id: 2, nome: 'Maria Oliveira', nota: 0,curso :"",turno:"",nivel:"" },
    { id: 3, nome: 'Pedro Santos', nota: 0,curso :"",turno:"",nivel:"" }
    // Adicione mais alunos conforme necessário
  ];
  alunos2! : ProfessorModel[]

  disciplinas : ProfessorModel[] = [
    { id: 1, nome: 'Matemática',curso:"",turno:"",nivel:"",nota:0 },
    { id: 2, nome: 'Português',curso:"",turno:"",nivel:"",nota:0 },
    { id: 3, nome: 'História',curso:"",turno:"",nivel:"",nota:0 }
    // Adicione mais disciplinas conforme necessário
  ];
  disciplinas2! : ProfessorModel[]

  disciplinaEscolhida!: number 


  constructor(private adminService: AdminService,
    
    private professorService: ProfessorService) { }
  

  ngOnInit(): void {

    this.idProf = this.recuperarIdProf();
      if((this.idProf !== null ) || 
         (this.idProf !== 0 )){
          const idProfNotNull = this.idProf !== null ? this.idProf : 0;
          this.idProfActual = idProfNotNull

        this.professorService.getTurmas(idProfNotNull).subscribe(cursos => {
          this.turmas = cursos;
        });

        this.mostrarTurmas = true
        this.lancarNotas1 = false
        this.verNotas0 =  false
        this.verNotas1 = false
        this.verNotas2 = false
        this.verMensagem = false
        this.verModal = false
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

          this.professorService.getDisciplinas(idProfNotNull,idTurma).subscribe(disciplinas => {
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
  
      console.log("this.idTurmaActual: "+this.idTurmaActual+" this.idProfActual: "+this.idProfActual+" this.disciplinaEscolhida: "+this.disciplinaEscolhida)
      console.log(`Notas lançadas para a disciplina ${this.disciplinaEscolhida}:`, notasLancadas);
      // Implemente a lógica real aqui, como enviar as notas para o servidor, etc.
      
              
      
        this.professorService.saveLancarProvas(this.idTurmaActual,this.idProfActual,this.disciplinaEscolhida,notasLancadas)
        .pipe(
          map((response) => {
            console.log('Resultado do Lancamento de Provas: ', response);
            // Adicione aqui qualquer ação adicional após o cadastro.
            
            if(response.prof != null){
              // mostrar a Lista 
              this.alunos = response.prof
              this.mensagem = response.mensagem
              
              this.verNotass = true
              this.verMensagem = true
              

            }
            this.mostrarTurmas = true
            this.verModal = false
            this.lancarNotas1 = false
            this.verNotas0 =  false
            this.verNotas1 = false
            this.verNotas2 = false
            
          }),
          catchError(error => {
            console.error('Erro ao Filtrar as Turmas:', error);
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

 






}
