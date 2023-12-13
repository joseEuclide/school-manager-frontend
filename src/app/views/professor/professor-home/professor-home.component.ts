import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/shared/admin-service/admin.service';

@Component({
  selector: 'app-professor-home',
  templateUrl: './professor-home.component.html',
  styleUrls: ['./professor-home.component.css']
})
export class ProfessorHomeComponent {

  inicio : boolean = false
  minhasTurmas : boolean = false


  constructor(private router: Router,private adminService: AdminService,) {}
 
    

  ngOnInit(): void {
    // Inicialize a variável 'inicio' obtendo seu valor do serviço ao iniciar o componente
    this.inicio = true
    this.minhasTurmas = false
    
  }

    
  aoClicar(valor: string): void {
    if (valor === 'inicio'){
      this.inicio = true
      this.minhasTurmas = false

       
    }else  if (valor === 'ver'){
      this.inicio = false
      this.minhasTurmas = false
      
    }else  if (valor === 'minhasTurmas'){
      this.inicio = false
      this.minhasTurmas = true
    
    }else  if (valor === 'sair'){
      this.inicio = false
      this.minhasTurmas = false
      

      this.router.navigate(['/']);
    }
  }
}
