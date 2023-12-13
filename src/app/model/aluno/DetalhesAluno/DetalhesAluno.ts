import { Nota } from "../Nota/nota.interface";
import { NotaDTO3 } from "../NotaDTO3/notaDTO3.interface"
import { Pagamento } from "../Pagamento/pagamento.interface";
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})

export class DetalhesAluno {
  // Variável privada para armazenar o nome
  
  private _notas: Nota[] =[]
  private _pagamento! : Pagamento

 
 
   // Setter para definir o valor do nome
   set notas(notas: Nota[]) {
    this._notas = notas;
  }

  get notas(): Nota[] {
    return this._notas;
  }

  // Setter para definir o valor do nome
  set pagamento(pagamento: Pagamento) {
    this._pagamento = pagamento;
  }

  get pagamento(): Pagamento {
    return this._pagamento;
  }
}
