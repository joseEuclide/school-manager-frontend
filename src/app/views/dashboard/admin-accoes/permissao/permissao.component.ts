import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AdminService } from 'src/app/shared/admin-service/admin.service';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Curso } from '../../model/curso';
import { FormularioData } from '../../model/FormularioData ';

@Component({
  selector: 'app-permissao',
  templateUrl: './permissao.component.html',
  styleUrls: ['./permissao.component.css']
})
export class PermissaoComponent implements OnInit{

  permissao = {
    tipoDeProva: '',
    lancarEmCasa: false,
    lancarNaEscola: true,
    eEpocaDeLancamento: false
  };

  idProf: number = 0;
  status: Boolean = false
  mensagem = ""
  exibirMensagem = false

  constructor(private fb: FormBuilder,private adminService : AdminService) {
   
  }

  ngOnInit(): void {
    this.exibirMensagem = false
  }

  criarPermissao() {
      // dar permissão ao(s) professor(s)
      console.log("idProf",this.idProf)
      const resultado = {
        permissao: this.permissao,
        idProf: this.idProf
      };
      console.log(JSON.stringify(resultado));
      this.adminService.criarPermissao(resultado)
    .pipe(
      map((response) => {
        console.log('  ********************  permissão Cadastradas:', response);
        // Adicione aqui qualquer ação adicional após o cadastro.
       this.mensagem = response.mensagem
       this.exibirMensagem = true
      }),
      catchError(error => {
        console.error('Erro Ao Cadastrar as Permissoes:', error);
        // Trate os erros de requisição, se necessário.
        return throwError(() => new Error(error)); // Throw new Error
      }) 
    )
    .subscribe();
    
  }
  
}
