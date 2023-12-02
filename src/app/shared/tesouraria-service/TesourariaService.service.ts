import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Propina } from 'src/app/model/tesouraria/propina.interface';


@Injectable({
  providedIn: 'root'
})
export class TesourariaService {

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

  public getAluno(idTurma: number,idAluno: number): Observable<Propina> {
   console.log("idTurma: ",idTurma,"idAluno: ",idAluno)
    return this.httpClient.get<Propina>(this.apiUrl+'pagar-propina-Aluno/'+idTurma+"/"+idAluno);
  }
  public pagarPropina(propina: any): Observable<Propina> {  
      return this.httpClient.post<Propina>(this.apiUrl+"cadastrar-Pagamento-Propina", propina, this.httpOptions);
  }

  


}
