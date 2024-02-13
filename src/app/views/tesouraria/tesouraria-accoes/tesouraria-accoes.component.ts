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
  mesesPropina = 0
  aluno = {
    nome: '',
    matricula: '',
    curso: '',
    mesesPropina: 0
  };
  meses = ["Janeiro","Fevereiro","Marco","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","DEzembro"]

  pagamentoRealizado = false;
  mesesAPagar: string[]= []
  mesesAPagar2: string[]= []
  detalhesAluno! : Propina
  exibirM1 = false
  exibirM2 = false
  mostrarGeral = false
  relatorio : any
  mesesSelecionados : string[]=[]  
  mensagem = false
  mostrarProgress = false
  

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
    this.mostrarGeral = true
    this.mensagem = false
    this.mostrarProgress = false
  }
  

  pesquisar() {
    
    this.mostrarProgress = true
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
              this.mostrarProgress = false

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

    this.mostrarProgress = true
      // Obtendo o valor do campo idTurma
      const idTurma = this.dadosAluno.get('idTurma')?.value;
      this.mesesAPagar =  this.mesesAPagar3(this.mesesPropina)
      
      const dadosDoAluno = {
        "idTurma":idTurma,
        "idAluno":this.detalhesAluno.id,
        "mesesAPagar": this.mesesAPagar 
      }
      console.log('Dados do pagamento:', dadosDoAluno);
      // Enviar os dados na API
        this.tesouraria.pagarPropina(dadosDoAluno)
          .pipe(
            map((response) => {
              console.log('Resultado do Pagamento:', response);
              // Adicione aqui qualquer ação adicional após o cadastro.
                console.log("Resposta: ",response)
                console.log("pagamento efectuado com sucesso")
                  this.exibirM2 = true
                  this.exibirM1 = false
                  this.detalhesAluno = response
                  this.aluno.mesesPropina = 0
                  this.detalhes_aluno = false
                  this.inicio = true
                  this.relatorio = response.relatorio
                  this.mostrarGeral = true
                  this.mensagem = true
                  this.mostrarProgress = false
                  
                
  
            }),
            catchError(error => {
              console.error('Erro ao Fazer o Pagamento:', error);
              // Trate os erros de requisição, se necessário.
              return throwError(() => new Error(error)); // Throw new Error
            }) 
          )
          .subscribe();
      
    
    this.dadosAluno.reset();
    this.mesesPropina = 0
    
  }

  imprimirRelatorio() {
    // Lógica para imprimir o relatório
    console.log('Relatório impresso.');

    this.mostrarGeral = false
    this.inicio = false
    this.exibirM1 = false
    this.exibirM2 = false
    this.detalhes_aluno = false
  }

  regressar(){
    this.mostrarGeral = true
    this.inicio = true
    this.exibirM1 = false
    this.exibirM2 = false
    this.detalhes_aluno = false
  }

   mesesAPagar3(meses : number):string[]{
    for(let i=0;i<meses;i++){
        this.mesesSelecionados.push(this.mesesAPagar[i])
      }
    return this.mesesSelecionados
   }
}
