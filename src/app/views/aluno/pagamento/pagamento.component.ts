import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/shared/admin-service/admin.service';
import { AlunoService } from 'src/app/shared/aluno-service/AlunoService.service';
import { Pagamento } from 'src/app/model/aluno/Pagamento/pagamento.interface';

@Component({
  selector: 'app-pagamento',
  templateUrl: './pagamento.component.html',
  styleUrls: ['./pagamento.component.css']
})
export class PagamentoComponent {

  pagamento! : Pagamento
  constructor(private adminService: AdminService,
    
    
    private alunoService: AlunoService) { }


  ngOnInit(): void {

    // Use a chave para recuperar o valor do localStorage
    // Recuperar o valor do localStorage

    /*
      var idAluno = localStorage.getItem("idAluno");
      var idTurma = localStorage.getItem("idTurma");

      var valorInteiro1; // Serve para armazenar o id do Aluno
      var valorInteiro2; // Serve para armazenar o id da Turma

      if (idAluno !== null && idTurma !== null) {
          valorInteiro1 = parseInt(idAluno, 10); // O segundo argumento (radix) é opcional, mas é uma boa prática fornecer
          valorInteiro2 = parseInt(idTurma, 10); // O segundo argumento (radix) é opcional, mas é uma boa prática fornecer
      
        } else {
          // Tratar o caso em que idAluno é null (se necessário)
          valorInteiro1 = 0; // Ou qualquer outro valor padrão que faça sentido no seu contexto
          valorInteiro2 = 0;
        }
    */
    this.alunoService.getPagamento(1,6).subscribe(pagamento => {
      this.pagamento = pagamento;
    });
    
  }
}
