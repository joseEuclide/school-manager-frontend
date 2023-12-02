import { Component } from '@angular/core';

@Component({
  selector: 'app-detalhes-aluno',
  templateUrl: './detalhes-aluno.component.html',
  styleUrls: ['./detalhes-aluno.component.css']
})
export class DetalhesAlunoComponent {

  aluno = {
    nome: '',
    matricula: '',
    curso: '',
    mesesPropina: 0
  };

  pagamentoRealizado = false;

  submitForm() {
    // Lógica para processar os dados do formulário e determinar se o pagamento foi realizado
    // Aqui, estamos apenas simulando um pagamento bem-sucedido para fins de exemplo.
    this.pagamentoRealizado = true;
    console.log('Formulário submetido:', this.aluno);
  }

  imprimirRelatorio() {
    // Lógica para imprimir o relatório
    console.log('Relatório impresso.');
  }
}
