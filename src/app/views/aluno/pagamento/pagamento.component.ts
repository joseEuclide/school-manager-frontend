import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/shared/admin-service/admin.service';
import { AlunoService } from 'src/app/shared/aluno-service/AlunoService.service';
import { Pagamento } from 'src/app/model/aluno/Pagamento/pagamento.interface';
import { DetalhesAluno } from 'src/app/model/aluno/DetalhesAluno/DetalhesAluno';

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

    constructor(private adminService: AdminService,
      private alunoService: AlunoService) { 
        this.aluno = new DetalhesAluno();
        this.pagamento =  this.aluno.pagamento
        console.log("++++++++ PAGAMENTO AQUI : (this.aluno.pagamento)= ",this.aluno.pagamento)
        
        this.idAluno = this.recuperarIdAluno();
        this.idTurma = this.recuperarIdTurma();

        if((this.idAluno !== null && this.idTurma !==null) || 
         (this.idAluno !== 0 && this.idTurma !==0)){
          const idAlunoNotNull = this.idAluno !== null ? this.idAluno : 0;
          const idTurmaNotNull = this.idTurma !== null ? this.idTurma : 0;
          this.alunoService.getPagamento(idAlunoNotNull,idTurmaNotNull).subscribe(pagamento => {
          
            console.log("pagamento: ",pagamento)
            this.pagamento = pagamento
            console.log("++++++ this.aluno.pagamento: ",this.aluno.pagamento)
            
          
          });
         }
   
      }


  ngOnInit(): void {
    console.log("++++++++ PAGAMENTO AQUI 2 : (this.aluno.pagamento)= ",this.aluno.pagamento)
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
