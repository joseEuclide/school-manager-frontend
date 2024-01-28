import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { PrecosPropina } from 'src/app/model/precos/precos.interface';
import { AdminService } from 'src/app/shared/admin-service/admin.service';
import { PrecosService } from 'src/app/shared/precos-service/precosService.service';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';


@Component({
  selector: 'app-precos-propinas',
  templateUrl: './precos-propinas.component.html',
  styleUrls: ['./precos-propinas.component.css']
})
export class PrecosPropinasComponent implements OnInit{


 

  precos! : PrecosPropina[]
  precos2 : PrecosPropina[] = [{ id: 1, idCurso: 1,nivel:"11",nome:"jota",valor:12 }]
  mostrar = false
  exibirMensagem = false
  mostrarProgress = false

  constructor(private fb: FormBuilder,
    private adminService : AdminService,
    private precoService : PrecosService) { }

    ngOnInit(): void {
  

    this.adminService.getCursos2().subscribe(precos => {
      this.precos = precos;
    });
    this.mostrar = false
    this.exibirMensagem = false
    this.mostrarProgress = false
  }

 cadastrarPrecos() {
    

      this.mostrarProgress = true
      const precosLancados = this.precos.map(preco => {
        return { idCurso: preco.id, nivel: preco.nivel, valor: preco.valor};
      });
  
      console.log("Lista de Precos dos Cursos: ", precosLancados);
      
        this.precoService.savePrecos(precosLancados)
        .pipe(
          map((response) => {
            console.log('Resultado do Lancamento de Provas: ', response);
            this.precos2 =  response
            this.mostrar = true
            this.exibirMensagem = true
            this.mostrarProgress = false
            
          }),
          catchError(error => {
            console.error('Erro Ao Cadastrar os Precos:', error);
            // Trate os erros de requisição, se necessário.
            return throwError(() => new Error(error)); // Throw new Error
          }) 
        )
        .subscribe();
      
    }

    sair(){
      this.mostrar = false
    }
  

}
