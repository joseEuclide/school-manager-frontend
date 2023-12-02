import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AdminService } from 'src/app/shared/admin-service/admin.service';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Curso } from '../../model/curso';


@Component({
  selector: 'app-turma',
  templateUrl: './turma.component.html',
  styleUrls: ['./turma.component.css']
})
export class TurmaComponent {

  turmaForm!: FormGroup;
  cursos: Curso[] = [];

   cursos2: Curso[] = [
    { id: 1, nome: 'Enfermagem' },
    { id: 2, nome: 'Analises Clinicas' },
    // Adicione mais cursos conforme necessário
  ];

  constructor(private fb: FormBuilder,private adminService : AdminService) { }

  ngOnInit(): void {
    this.turmaForm = this.fb.group({
      nome: ['', Validators.required],
      nivel: ['', Validators.required],
      curso: ['', Validators.required],
      turno: ['', Validators.required]
    });

    this.adminService.getCursos().subscribe(cursos => {
      this.cursos = cursos;
    });
  } 

  onSubmit() {
    if (this.turmaForm.valid) {
      const formData = this.turmaForm.value;
      console.log('Dados a serem enviados:', formData);
      // Implemente a lógica para enviar os dados da turma para a API ou realizar outras ações
    } else {
      console.log('Formulário inválido. Verifique os campos.');
    }
  }

  cadastrarTurma() {
      const cursoValor = parseInt(this.turmaForm.get('curso')?.value, 10);
      console.log("cursoValor: ",cursoValor)
      console.log('Dados da turma a serem cadastrados:', this.turmaForm.value);
      this.adminService.criarTurma(this.turmaForm.value,cursoValor)
        .pipe(
          map((response) => {
            console.log('Turma cadastrado com sucesso:', response);
            // Adicione aqui qualquer ação adicional após o cadastro.
          }),
          catchError(error => {
            console.error('Erro ao cadastrar a Turma:', error);
            // Trate os erros de requisição, se necessário.
            return throwError(() => new Error(error)); // Throw new Error
          }) 
        )
        .subscribe();
     
    this.turmaForm.reset()
  }
  
}
