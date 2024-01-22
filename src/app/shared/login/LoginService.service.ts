import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Propina } from 'src/app/model/tesouraria/propina.interface';
import { NotaDTO3 } from 'src/app/model/aluno/NotaDTO3/notaDTO3.interface';
import { Pagamento } from 'src/app/model/aluno/Pagamento/pagamento.interface';
import { Nota } from 'src/app/model/aluno/Nota/nota.interface';
import { Login } from 'src/app/model/login/login.interface';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

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
 
  public login(login: any): Observable<Login> {  
    console.log("login: ",login)
    return this.httpClient.post<Login>(this.apiUrl+"login",login, this.httpOptions);
   }


}
