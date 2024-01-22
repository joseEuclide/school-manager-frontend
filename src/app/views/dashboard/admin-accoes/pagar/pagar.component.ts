import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AdminService } from 'src/app/shared/admin-service/admin.service';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Curso } from '../../model/curso';
import { FormularioData } from '../../model/FormularioData ';


@Component({
  selector: 'app-pagar',
  templateUrl: './pagar.component.html',
  styleUrls: ['./pagar.component.css']
})
export class PagarComponent implements OnInit{


  status: Boolean = false
  exibirMensagem = false

  constructor(private fb: FormBuilder,private adminService : AdminService) {
   
  }

  ngOnInit(): void {
    this.exibirMensagem = false
  }

  pagarFuncionarios() {
    console.log("idProf",this.status)

    this.adminService.criarPagarFuncionarios(JSON.stringify(true))
    .pipe(
      map((response) => {
        console.log('  ********************  Funcionarios Pagos Com Sucesso:', response);
        // Adicione aqui qualquer ação adicional após o cadastro.
        this.exibirMensagem = true
      }),
      catchError(error => {
        console.error('Erro Ao Pagar os Funcionarios:', error);
        // Trate os erros de requisição, se necessário.
        return throwError(() => new Error(error)); // Throw new Error
      }) 
    )
    .subscribe();
    
  }
}
