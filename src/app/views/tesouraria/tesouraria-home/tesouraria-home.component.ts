import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/shared/localstorageService/LocalStorage.service';

@Component({
  selector: 'app-tesouraria-home',
  templateUrl: './tesouraria-home.component.html',
  styleUrls: ['./tesouraria-home.component.css']
})
export class TesourariaHomeComponent {

   inicio : boolean = false
   propinas : boolean = false
   id :  number = 0 
   nome : string = ""
 
  constructor(private router: Router, private localStorage : LocalStorageService) {}
 

  ngOnInit(): void {
    // Inicialize a variável 'inicio' obtendo seu valor do serviço ao iniciar o componente
    this.inicio = true
    this.propinas = false
    
    this.id = this.localStorage.getIntItem("id") || 0
    this.nome = localStorage.getItem("nome") || ""

    

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
