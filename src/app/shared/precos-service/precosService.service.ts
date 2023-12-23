import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Propina } from 'src/app/model/tesouraria/propina.interface';
import { NotaDTO3 } from 'src/app/model/aluno/NotaDTO3/notaDTO3.interface';
import { Pagamento } from 'src/app/model/aluno/Pagamento/pagamento.interface';
import { Nota } from 'src/app/model/aluno/Nota/nota.interface';
import { PrecosPropina } from 'src/app/model/precos/precos.interface';


@Injectable({
  providedIn: 'root'
})
export class PrecosService {

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
  
  public getCursos(): Observable<PrecosPropina[]> {
   console.log(" Listando os cursos ")
    return this.httpClient.get<PrecosPropina[]>(this.apiUrl+'todos-curso');
  }

   public savePrecos(precos: any): Observable<PrecosPropina[]> {  
    return this.httpClient.post<PrecosPropina[]>(this.apiUrl+"precos-das-propinas-2", precos, this.httpOptions);
   }

 

  


}
