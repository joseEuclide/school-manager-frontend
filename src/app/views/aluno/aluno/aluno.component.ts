import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-aluno',
  templateUrl: './aluno.component.html',
  styleUrls: ['./aluno.component.css']
})
export class AlunoComponent implements OnInit{


  inicio : boolean = false
  notas : boolean = false
  pagamentos : boolean = false


  constructor(private router: Router) {}
 

  ngOnInit(): void {
    // Inicialize a variável 'inicio' obtendo seu valor do serviço ao iniciar o componente
    this.inicio = true
    this.notas = false
    this.pagamentos = false
    

  }

    
  aoClicar(valor: string): void {
    if (valor === 'inicio'){
      this.inicio = true
      this.notas = false
      this.pagamentos = false

       
    }else  if (valor === 'ver'){
      this.inicio = false
      this.notas = false
      this.pagamentos = false
      
    }else  if (valor === 'notas'){
      this.inicio = false
      this.notas = true
      this.pagamentos = false
    
    }else  if (valor === 'pagamentos'){
      this.inicio = false
      this.notas = false
      this.pagamentos = true
    
    }else  if (valor === 'sair'){
      this.inicio = false
      this.notas = false
      this.pagamentos = false
      

      this.router.navigate(['/']);
    }
  }
}
