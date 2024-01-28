import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/shared/admin-service/admin.service';
import { AlunoService } from 'src/app/shared/aluno-service/AlunoService.service';
import { Pagamento } from 'src/app/model/aluno/Pagamento/pagamento.interface';
import { DetalhesAluno } from 'src/app/model/aluno/DetalhesAluno/DetalhesAluno';
import { LocalStorageService } from 'src/app/shared/localstorageService/LocalStorage.service';

@Component({
  selector: 'app-pagamento',
  templateUrl: './pagamento.component.html',
  styleUrls: ['./pagamento.component.css']
})
export class PagamentoComponent implements OnInit{

  pagamento! : Pagamento
  aluno!: DetalhesAluno;
  idAluno!: number | null;
  idTurma!: number | null;
  mostrarProgress = false

    constructor(private adminService: AdminService,
      private alunoService: AlunoService,
      private localStorage : LocalStorageService
      ) { 
        this.aluno = new DetalhesAluno();
        this.pagamento =  this.aluno.pagamento
        console.log("++++++++ PAGAMENTO AQUI : (this.aluno.pagamento)= ",this.aluno.pagamento)
        
          this.mostrarProgress = true
          const idAlunoNotNull = this.localStorage.getIntItem("idAluno") || 0
          const idTurmaNotNull = this.localStorage.getIntItem("idTurma") || 0
          this.alunoService.getPagamento(idAlunoNotNull,idTurmaNotNull).subscribe(pagamento => {
          
            console.log("pagamento: ",pagamento)
            this.pagamento = pagamento
            console.log("++++++ this.aluno.pagamento: ",this.aluno.pagamento)
            this.mostrarProgress = false
          
          });
     
   
      }


  ngOnInit(): void {
  }

 
}
