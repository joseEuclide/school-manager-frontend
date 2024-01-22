import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from 'src/app/shared/admin-service/admin.service';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';


@Component({
  selector: 'app-curso',
  templateUrl: './curso.component.html',
  styleUrls: ['./curso.component.css']
})
export class CursoComponent implements OnInit{

  cursoForm2!: FormGroup;
  exibirMensagem = false

  constructor(private fb: FormBuilder,private adminService : AdminService) { }

  ngOnInit(): void {
    this.cursoForm2 = this.fb.group({
      nome: ['', [Validators.required]],
    });
    this.exibirMensagem = false
  }


  cadastrarCurso() {
    if (this.cursoForm2.valid) {
      console.log('Dados do curso a serem cadastrados:', this.cursoForm2.value);
      this.adminService.criarCurso(this.cursoForm2.value)
        .pipe(
          map((response) => {
            console.log('Curso cadastrado com sucesso:', response);
            // Adicione aqui qualquer ação adicional após o cadastro.
            this.exibirMensagem = true
          }),
          catchError(error => {
            console.error('Erro ao cadastrar o curso:', error);
            // Trate os erros de requisição, se necessário.
            return throwError(() => new Error(error)); // Throw new Error
          }) 
        )
        .subscribe();
    } else {
      console.log('Formulário inválido. Verifique os campos.');
    }
  }


}
