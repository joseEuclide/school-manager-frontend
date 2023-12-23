import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/shared/localstorageService/LocalStorage.service';

@Component({
  selector: 'app-secretaria-home',
  templateUrl: './secretaria-home.component.html',
  styleUrls: ['./secretaria-home.component.css']
})
export class SecretariaHomeComponent implements OnInit{

   inicio : boolean = false
   cadastrarAluno : boolean = false
   id :  number = 0 
   nome : string = ""
   
 
  constructor(private router: Router,
              private localStorage : LocalStorageService) {}
 

  ngOnInit(): void {
    // Inicialize a variável 'inicio' obtendo seu valor do serviço ao iniciar o componente
    this.inicio = true
    this.cadastrarAluno = false
    
    this.id = this.localStorage.getIntItem("id") || 0
    this.nome = localStorage.getItem("nome") || ""

  }

    
  aoClicar(valor: string): void {
    if (valor === 'inicio'){
      this.inicio = true
      this.cadastrarAluno = false
      

       
    }else  if (valor === 'ver'){
      this.inicio = false
      this.cadastrarAluno = false
      
    }else  if (valor === 'cadastrarAluno'){
      this.inicio = false
      this.cadastrarAluno = true
    
    }else  if (valor === 'sair'){
      this.inicio = false
      this.cadastrarAluno = false
      

      this.router.navigate(['/']);
    }
  }

}
