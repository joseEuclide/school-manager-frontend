import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Propina } from 'src/app/model/tesouraria/propina.interface';
import { NotaDTO3 } from 'src/app/model/aluno/NotaDTO3/notaDTO3.interface';
import { Pagamento } from 'src/app/model/aluno/Pagamento/pagamento.interface';
import { Nota } from 'src/app/model/aluno/Nota/nota.interface';


@Injectable({
  providedIn: 'root'
})
export class AlunoService {

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
  
  public getNotas(alunoId: number,idTurma: number): Observable<Nota[]> {
   console.log("alunoId: ",alunoId,"idAluno: ",idTurma)
   console.log("************* Buscando notas")
    return this.httpClient.get<Nota[]>(this.apiUrl+'notas/'+alunoId+'/'+idTurma);
  }

  public getPagamento(alunoId: number,idTurma: number): Observable<Pagamento> {
    console.log("************* Buscando PAgamentos de Propinas") 
    console.log("alunoId: ",alunoId,"idAluno: ",idTurma)
     return this.httpClient.get<Pagamento>(this.apiUrl+'pagamento-aluno/'+idTurma+'/'+alunoId);
   }

 

  


}
