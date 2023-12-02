import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from 'src/app/shared/admin-service/admin.service';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { TesourariaService } from 'src/app/shared/tesouraria-service/TesourariaService.service';
import { Propina } from 'src/app/model/tesouraria/propina.interface';


@Component({
  selector: 'app-tesouraria-accoes',
  templateUrl: './tesouraria-accoes.component.html',
  styleUrls: ['./tesouraria-accoes.component.css']
})
export class TesourariaAccoesComponent implements OnInit{

  dadosAluno!: FormGroup;
  inicio= true;
  detalhes_aluno = false
  aluno = {
    nome: '',
    matricula: '',
    curso: '',
    mesesPropina: 0
  };

  pagamentoRealizado = false;
  mesesAPagar: string[]= []
  mesesAPagar2: string[]= []
  detalhesAluno! : Propina
  exibirM1 = false
  exibirM2 = false

  constructor(private fb: FormBuilder,private tesouraria : TesourariaService) { }

  ngOnInit(): void {
    this.dadosAluno = this.fb.group({
      idAluno: [0 , [Validators.required]],
      idTurma: [0 , [Validators.required]],
    });
    this.inicio = true
    this.detalhes_aluno = false
    this.exibirM1 = false
    this.exibirM2 = false
  }
  

  pesquisar() {

    // Obtendo o valor do campo idAluno
    const idAluno = this.dadosAluno.get('idAluno')?.value;

    // Obtendo o valor do campo idTurma
    const idTurma = this.dadosAluno.get('idTurma')?.value;

    if (this.dadosAluno.valid) {
      console.log('Dados do aluno:', this.dadosAluno.value);
      this.tesouraria.getAluno(idTurma,idAluno)
        .pipe(
          map((response) => {
            console.log('Resultado da Pesquisa do Aluno:', response);
            // Adicione aqui qualquer ação adicional após o cadastro.
              this.detalhesAluno = response
              
              if(this.detalhesAluno.mensagem != null && 
                 this.detalhesAluno.mensagem ==="Existe Aluno Com os Dados Informados" ){
                  console.log("*************************")
                  this.inicio = false
                  this.detalhes_aluno = true
                  
                  this.mesesAPagar = this.detalhesAluno.mesesAPagar
              }else{
                console.log("=============================")
                this.detalhesAluno.mensagem = "Não Existe Aluno Com os Dados Fornecidos";
                this.exibirM1 = true
                this.exibirM2 = false
              }
              

          }),
          catchError(error => {
            console.error('Erro ao Pesquisar o Aluno:', error);
            // Trate os erros de requisição, se necessário.
            return throwError(() => new Error(error)); // Throw new Error
          }) 
        )
        .subscribe();
    } else {
      console.log('Formulário inválido. Verifique os campos.');
    }
  }

  pagarPropina() {

    if(this.aluno.mesesPropina > 0){
      for (let i = 0; i < this.aluno.mesesPropina; i++) {
        this.mesesAPagar2.push(this.mesesAPagar[i]);      
      }
      console.log(this.mesesAPagar2);
      // Obtendo o valor do campo idTurma
      const idTurma = this.dadosAluno.get('idTurma')?.value;
      const dadosDoAluno = {
        "idTurma":idTurma,
        "idAluno":this.detalhesAluno.id,
        "mesesAPagar": this.mesesAPagar2
      }
      
      // Enviar os dados na API
      if (dadosDoAluno != null) {
        console.log('Dados do pagamento:', dadosDoAluno);
        this.tesouraria.pagarPropina(dadosDoAluno)
          .pipe(
            map((response) => {
              console.log('Resultado do Pagamento:', response);
              // Adicione aqui qualquer ação adicional após o cadastro.
                console.log("Resposta: ",response)
                console.log("pagamento efectuado com sucesso")
                if(response.relatorio != null){
                  this.exibirM2 = true
                  this.exibirM1 = false
                  this.detalhesAluno = response
                  this.aluno.mesesPropina = 0
                  this.detalhes_aluno = false
                  this.inicio = true
                }
  
            }),
            catchError(error => {
              console.error('Erro ao Fazer o Pagamento:', error);
              // Trate os erros de requisição, se necessário.
              return throwError(() => new Error(error)); // Throw new Error
            }) 
          )
          .subscribe();
      } else {
        console.log('Formulário inválido. Verifique os campos.');
      }
    }else{
      // Informe Quantos meses Quer Pagar
      // 
    }
    this.dadosAluno.reset();
  }

  imprimirRelatorio() {
    // Lógica para imprimir o relatório
    console.log('Relatório impresso.');
  }

}
