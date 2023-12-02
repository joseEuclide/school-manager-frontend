import { Component, OnInit } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { FormBuilder, FormGroup, FormArray,Validators, FormControl } from '@angular/forms';
import { AdminService } from 'src/app/shared/admin-service/admin.service';


@Component({
  selector: 'app-secretaria',
  templateUrl: './secretaria.component.html',
  styleUrls: ['./secretaria.component.css']
})
export class SecretariaComponent implements OnInit {

  secretarioForm: FormGroup;

  constructor(private fb: FormBuilder, private adminService : AdminService) {
    this.secretarioForm = this.fb.group({
      secretarios: this.fb.array([])
    });
  }

  ngOnInit() {
    this.adicionarSecretario();
  }

  get secretarios() {
    return (this.secretarioForm.get('secretarios') as FormArray);
  }

  adicionarSecretario() {
    const secretariosArray = this.secretarioForm.get('secretarios') as FormArray;
    secretariosArray.push(this.fb.group({
      nome: [''],
      bi: ['']
    }));
  }

  removerSecretario(index: number) {
    const secretariosArray = this.secretarioForm.get('secretarios') as FormArray;
    secretariosArray.removeAt(index);
  }

  getNomeControl(index: number) {
    return ((this.secretarioForm.get('secretarios') as FormArray).at(index) as FormGroup).get('nome') as FormControl;
  }

  getBiControl(index: number) {
    return ((this.secretarioForm.get('secretarios') as FormArray).at(index) as FormGroup).get('bi') as FormControl;
  }

  cadastrarSecretarios() {
    // Lógica para cadastrar os secretários com nome e BI
    const secretarios = this.secretarioForm.value.secretarios;
    console.log('Dados dos Secretários:', secretarios);

    this.adminService.criarSecretarios(secretarios)
    .pipe(
      map((response) => {
        console.log('  ********************  Secretarios Cadastrados:', response);
        // Adicione aqui qualquer ação adicional após o cadastro.
       
      }),
      catchError(error => {
        console.error('Erro Ao Cadastrar os Secretarios:', error);
        // Trate os erros de requisição, se necessário.
        return throwError(() => new Error(error)); // Throw new Error
      }) 
    )
    .subscribe();
    this.secretarioForm.reset()
  }

}
