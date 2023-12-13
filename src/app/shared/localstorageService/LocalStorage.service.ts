import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Propina } from 'src/app/model/tesouraria/propina.interface';
import { turmaDTO2 } from 'src/app/views/dashboard/model/turmaDTO2';
import { SecretariaModel } from 'src/app/model/secretaria/secretaria.interface';


@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

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

  public getProf2(cursos: number[], niveis: string[], turnos: string[]): Observable<turmaDTO2[]> {
    const params = {
      cursos: cursos.join(','),
      niveis: niveis.join(','),
      turnos: turnos.join(',')
    };

    // Enviar os parâmetros como parte da requisição
    const request = this.apiUrl+'filtrar-turmas-para-o-professor/?cursos='+cursos+"&niveis="+niveis+"&turnos="+turnos
    console.log("params"+params)
    return this.httpClient.get<turmaDTO2[]>(request);
  }


  public getAluno(idTurma: number,idAluno: number): Observable<Propina> {
   console.log("idTurma: ",idTurma,"idAluno: ",idAluno)
    return this.httpClient.get<Propina>(this.apiUrl+'pagar-propina-Aluno/'+idTurma+"/"+idAluno);
  }
  public matricularAluno(idTurma: number, aluno: any): Observable<SecretariaModel> {  
      return this.httpClient.post<SecretariaModel>(this.apiUrl+"cadastrar-aluno/"+idTurma, aluno, this.httpOptions);
  }

  


}
