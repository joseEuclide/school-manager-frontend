import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tesouraria-home',
  templateUrl: './tesouraria-home.component.html',
  styleUrls: ['./tesouraria-home.component.css']
})
export class TesourariaHomeComponent {

   inicio : boolean = false
   propinas : boolean = false
   
 
  constructor(private router: Router) {}
 

  ngOnInit(): void {
    // Inicialize a variável 'inicio' obtendo seu valor do serviço ao iniciar o componente
    this.inicio = true
    this.propinas = false
    

  }

    
  aoClicar(valor: string): void {
    if (valor === 'inicio'){
      this.inicio = true
      this.propinas = false
      

       
    }else  if (valor === 'ver'){
      this.inicio = false
      this.propinas = false
      
    }else  if (valor === 'propinas'){
      this.inicio = false
      this.propinas = true
    
    }else  if (valor === 'sair'){
      this.inicio = false
      this.propinas = false
      

      this.router.navigate(['/']);
    }
  }
}
