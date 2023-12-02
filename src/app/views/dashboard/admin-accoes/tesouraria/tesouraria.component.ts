import { Component, OnInit } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { FormBuilder, FormGroup, FormArray,Validators, FormControl } from '@angular/forms';
import { AdminService } from 'src/app/shared/admin-service/admin.service';

@Component({
  selector: 'app-tesouraria',
  templateUrl: './tesouraria.component.html',
  styleUrls: ['./tesouraria.component.css']
})
export class TesourariaComponent implements OnInit{

  tesourariaForm!: FormGroup;

  constructor(private fb: FormBuilder,private adminService : AdminService) {
    this.tesourariaForm = this.fb.group({
      tesoureiros: this.fb.array([])
    });
  }

  ngOnInit() {
    this.adicionarTesoureiros();
  }

  get tesoureiros() {
    return (this.tesourariaForm.get('tesoureiros') as FormArray);
  }

  adicionarTesoureiros() {
    const secretariosArray = this.tesourariaForm.get('tesoureiros') as FormArray;
    secretariosArray.push(this.fb.group({
      nome: [''],
      bi: ['']
    }));
  }

  removerTesoureiros(index: number) {
    const secretariosArray = this.tesourariaForm.get('tesoureiros') as FormArray;
    secretariosArray.removeAt(index);
  }

  getNomeControl(index: number) {
    return ((this.tesourariaForm.get('tesoureiros') as FormArray).at(index) as FormGroup).get('nome') as FormControl;
  }

  getBiControl(index: number) {
    return ((this.tesourariaForm.get('tesoureiros') as FormArray).at(index) as FormGroup).get('bi') as FormControl;
  }

  cadastrarTesoureiros() {
    // Lógica para cadastrar os secretários com nome e BI
    const tesoureiros = this.tesourariaForm.value.tesoureiros;
    console.log('Dados dos Tesoureiros:', tesoureiros);
    this.adminService.criarTesoureiros(tesoureiros)
    .pipe(
      map((response) => {
        console.log('  ********************  Tesoureiros Cadastrados:', response);
        // Adicione aqui qualquer ação adicional após o cadastro.
       
      }),
      catchError(error => {
        console.error('Erro Ao Cadastrar os Tesoureiros:', error);
        // Trate os erros de requisição, se necessário.
        return throwError(() => new Error(error)); // Throw new Error
      }) 
    )
    .subscribe();
    this.tesourariaForm.reset()
  }

}
