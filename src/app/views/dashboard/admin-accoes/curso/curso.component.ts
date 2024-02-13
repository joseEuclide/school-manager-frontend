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
  mostrarProgress = false
  mensagem! : string

  constructor(private fb: FormBuilder,private adminService : AdminService) { }

  ngOnInit(): void {
    this.cursoForm2 = this.fb.group({
      nome: ['', [Validators.required]],
    });
    this.exibirMensagem = false
    this.mostrarProgress = false
  }


  cadastrarCurso() {
    this.mostrarProgress = true
    if (this.cursoForm2.valid) {
      console.log('Dados do curso a serem cadastrados:', this.cursoForm2.value);
      this.adminService.criarCurso(this.cursoForm2.value)
        .pipe(
          map((response) => {

            if(response != null){
              this.mensagem = "Curso cadastrado com sucesso"
              console.log('Curso cadastrado com sucesso:', response);
            }else{
              this.mensagem = "Ja Existe Um Curso Com Esse Nome Cadastrado"
              console.log('Ja Existe Um Curso Com Esse Nome Cadastrado:', response);
            }
            
            // Adicione aqui qualquer ação adicional após o cadastro.
            this.exibirMensagem = true
            this.mostrarProgress = false

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
