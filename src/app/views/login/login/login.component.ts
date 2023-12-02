import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  usuario: string= "";
  senha: string = "";

  constructor(private router: Router) {}

  onSubmit() {
    // Este é apenas um exemplo de como você pode processar o envio do formulário.
    console.log('Usuário:', this.usuario);
    console.log('Senha:', this.senha);
    alert('Formulário enviado! Verifique o console para ver os dados.');
    
    this.router.navigate(['/admin']);
  }
}
