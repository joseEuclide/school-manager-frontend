import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/shared/admin-service/admin.service';
import { AlunoService } from 'src/app/shared/aluno-service/AlunoService.service';
import { NotaDTO3 } from 'src/app/model/aluno/NotaDTO3/notaDTO3.interface';


@Component({
  selector: 'app-nota',
  templateUrl: './nota.component.html',
  styleUrls: ['./nota.component.css']
})
export class NotaComponent implements OnInit{

  notas : NotaDTO3[] = []
  constructor(private adminService: AdminService,
    
    
    private alunoService: AlunoService) { }


  ngOnInit(): void {

    // Use a chave para recuperar o valor do localStorage
    // Recuperar o valor do localStorage
     /*
      var idAluno = localStorage.getItem("idAluno");
      var idTurma = localStorage.getItem("idTurma");

      // Verificar se idAluno não é null antes de converter para um número
      var valorInteiro1;
      var valorInteiro2;

      if (idAluno !== null && idTurma !== null) {
          valorInteiro1 = parseInt(idAluno, 10); // O segundo argumento (radix) é opcional, mas é uma boa prática fornecer
          valorInteiro2 = parseInt(idTurma, 10); // O segundo argumento (radix) é opcional, mas é uma boa prática fornecer
      
        } else {
          // Tratar o caso em que idAluno é null (se necessário)
          valorInteiro1 = 0; // Ou qualquer outro valor padrão que faça sentido no seu contexto
          valorInteiro2 = 0;
        }
        */

    this.alunoService.getNotas(6,1).subscribe(notas => {
      this.notas = notas;
    });
    
  }


}
