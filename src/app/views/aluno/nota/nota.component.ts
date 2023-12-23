import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/shared/admin-service/admin.service';
import { AlunoService } from 'src/app/shared/aluno-service/AlunoService.service';
import { NotaDTO3 } from 'src/app/model/aluno/NotaDTO3/notaDTO3.interface';
import { DetalhesAluno } from 'src/app/model/aluno/DetalhesAluno/DetalhesAluno';
import { Nota } from 'src/app/model/aluno/Nota/nota.interface';
import { LocalStorageService } from 'src/app/shared/localstorageService/LocalStorage.service';


@Component({
  selector: 'app-nota',
  templateUrl: './nota.component.html',
  styleUrls: ['./nota.component.css']
})
export class NotaComponent implements OnInit{

  notas : Nota[] = []
  aluno!: DetalhesAluno;
  idAluno!: number | null;
  idTurma!: number | null;

  constructor(private adminService: AdminService,
    private alunoService: AlunoService,
    private localStorage : LocalStorageService
    ) { 


      this.aluno = new DetalhesAluno();
      console.log("++++++++ NOTAS AQUI : (this.aluno.notas)= ",this.aluno.notas)
     
          const idAlunoNotNull = this.localStorage.getIntItem("idAluno") || 0
          const idTurmaNotNull = this.localStorage.getIntItem("idTurma") || 0
          this.alunoService.getNotas(idAlunoNotNull,idTurmaNotNull).subscribe(notas => {

            console.log("Notas: ",notas)
            this.notas =  notas
            console.log("+++++++++ this.aluno.notas: ",this.aluno.notas)
          
          });
        
      
    }


  ngOnInit(): void {
    this.aluno = new DetalhesAluno();
    this.notas =  this.aluno.notas
    console.log("++++++++ NOTAS AQUI 2 : (this.aluno.notas)= ",this.aluno.notas)
    
  }
  recuperarIdAluno(): number | null {
    const valor = localStorage.getItem('idAluno');
    return valor !== null ? parseInt(valor, 10) : null;
  }
  recuperarIdTurma(): number | null {
    const valor = localStorage.getItem('idTurma');
    return valor !== null ? parseInt(valor, 10) : null;
  }

}
