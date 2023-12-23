import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/shared/login/LoginService.service';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Login } from 'src/app/model/login/login.interface';
import { LocalStorageService } from 'src/app/shared/localstorageService/LocalStorage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  username: string= "";
  password: string = "";
  login2! : Login 

  ngOnInit(): void {
   
  }  

  constructor(private router: Router,
              private loginService : LoginService,
              private localStorage : LocalStorageService) {}
            

 

  login() {
 
   
     
    this.router.navigate(['/admin']);
      this.loginService.getLogin(this.username, this.password)
        .pipe(
          map((response) => {
            console.log('Dados de Login:', response);
            this.login2 = response
            
            localStorage.setItem('nome', this.login2.nome);

            
            if(this.login2.funcao === "admin"){
              this.localStorage.setIntItem('id', this.login2.id)
              this.router.navigate(['/admin']);

            }else if(this.login2.funcao === "tesouraria"){
              this.localStorage.setIntItem('id', this.login2.id)
              this.router.navigate(['/tesou']);

            }else if(this.login2.funcao === "secretaria"){
              this.localStorage.setIntItem('id', this.login2.id)
              this.router.navigate(['/secret']);

            }else if(this.login2.funcao === "professor"){
              this.localStorage.setIntItem('id', this.login2.id)
              this.router.navigate(['/prof']);

            }else if(this.login2.funcao === "aluno"){
              this.localStorage.setIntItem('idTurma', this.login2.idTurma)
              this.localStorage.setIntItem('idAluno', this.login2.id)
              this.router.navigate(['/aluno']);
              
            }


            // Adicione aqui qualquer ação adicional após o cadastro.
          }),
          catchError(error => {
            console.error('Erro ao Fazer o Login:', error);
            // Trate os erros de requisição, se necessário.
            return throwError(() => new Error(error)); // Throw new Error
          }) 
        )
        .subscribe();

        
    } 
    
  }

