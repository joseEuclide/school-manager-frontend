import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/shared/admin-service/admin.service';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { AlunoService } from 'src/app/shared/aluno-service/AlunoService.service';

@Component({
  selector: 'app-aluno-inicio',
  templateUrl: './aluno-inicio.component.html',
  styleUrls: ['./aluno-inicio.component.css']
})
export class AlunoInicioComponent {

 
}
