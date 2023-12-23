import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AdminService } from 'src/app/shared/admin-service/admin.service';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit{

   // Modelo para os dados do formulário
  formData = {
    nome: '',
    bi: '',
    email: ''
  };
  mostrar = false

  ngOnInit(): void {
    this.mostrar = false
  }

  constructor(private fb: FormBuilder,private adminService : AdminService) { }


  cadastrar() {
      console.log('Dados do Admin a serem cadastrados:', this.formData);
      this.adminService.criarAdmin(this.formData)
        .pipe(
          map((response) => {
            console.log('Admin cadastrado com sucesso:', response);
            this.mostrar = true

            // Adicione aqui qualquer ação adicional após o cadastro.
          }),
          catchError(error => {
            console.error('Erro ao cadastrar o Admin:', error);
            // Trate os erros de requisição, se necessário.
            return throwError(() => new Error(error)); // Throw new Error
          }) 
        )
        .subscribe();
        this.formData.nome = ""
        this.formData.email = ""
        this.formData.bi = ""
    
  }

  sair(){
    this.mostrar = false
  }

}
