import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Propina } from 'src/app/model/tesouraria/propina.interface';
import { NotaDTO3 } from 'src/app/model/aluno/NotaDTO3/notaDTO3.interface';
import { Pagamento } from 'src/app/model/aluno/Pagamento/pagamento.interface';
import { Nota } from 'src/app/model/aluno/Nota/nota.interface';
import { ProfessorModel } from 'src/app/model/professor/professor.interface';
import { DetalheProfessorModel } from 'src/app/model/professor/detralheProfessor.interface';


@Injectable({
  providedIn: 'root'
})
export class ProfessorService {

  apiUrl = 'http://localhost:8080/';
  httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

  constructor(
      private httpClient: HttpClient
  ) {}

  
  /*
  public getLivesWithFlag(flag: string): Observable<ResponsePageable> {
      return this.httpClient.get<ResponsePageable>(this.apiUrl + '?flag=' + flag);
  }
   */
  
  public getTurmas(idProfessor: number): Observable<ProfessorModel[]> {
   console.log("idProfessor: ",idProfessor)
   console.log("************* Buscando Turmas do Professor")
    return this.httpClient.get<ProfessorModel[]>(this.apiUrl+'lista-turmas-do-professor/'+idProfessor);
  }
    public getDisciplinas(idProf: number,idTurma: number): Observable<ProfessorModel[]> {
    console.log("************* Buscando Disciplinas do Professor") 
    console.log("idProf: ",idProf,"idTurma: ",idTurma)
     return this.httpClient.get<ProfessorModel[]>(this.apiUrl+'listar-disciplinas-Do-Prof/'+idProf+'/'+idTurma);
   }
   public getAlunosDaTurma(idTurma: number): Observable<ProfessorModel[]> {
    console.log("************* Buscando Alunos da Turma") 
    console.log("idTurma: ",idTurma)
     return this.httpClient.get<ProfessorModel[]>(this.apiUrl+'alunos-da-turma/'+idTurma);
   }
   public saveLancarProvas(idTurma: number, idProf: number,idDisciplina : number, notas : any): Observable<DetalheProfessorModel> {  
    return this.httpClient.post<DetalheProfessorModel>(this.apiUrl+"lancar-notas-turma/"+idTurma+"/"+idProf+"/"+idDisciplina, notas, this.httpOptions);
}

 

  


}
