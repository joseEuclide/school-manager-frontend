import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/shared/admin-service/admin.service';
import { Curso } from '../../dashboard/model/curso';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { SecretariaService } from 'src/app/shared/secretaria-service/SecretariaService.service';
import { SecretariaModel } from 'src/app/model/secretaria/secretaria.interface';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';


interface Turma {
  id:number;
  nome: String;
  disciplinas:String[];
  
}

@Component({
  selector: 'app-secretaria-accoes',
  templateUrl: './secretaria-accoes.component.html',
  styleUrls: ['./secretaria-accoes.component.css']
})
export class SecretariaAccoesComponent implements OnInit {

  selectedCurso!: number 
  selectedTurma!: number 
  selectedNivel: string = ""
  selectedTurno: string = ""
  cursos2: Curso[] = [];
  cursos: number[]=[]
  turnos: string[]=[]
  niveis: string[]=[]
  mostrarTurmas = false
  turmas :Turma[] = [];
  mostrar1 = true
  mostrar2 = false
  mostrar3 = false
  sucesso = false
  nome : string =""
  bi : string = ""
  relatorio! : SecretariaModel
  mensagem = ""
  mostrarProgress = false
  relatorioArrayBuffer: ArrayBuffer | undefined;
  relatorio2!: SafeResourceUrl;

  constructor(private adminService: AdminService,
              private secretariaService: SecretariaService,
              private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.adminService.getCursos().subscribe(cursos => {
      this.cursos2 = cursos;
    });
    this.mostrarTurmas = false
    this.mostrar1 = true
    this.mostrar2 = false
    this.mostrar3 = false
    this.sucesso = false
    this.mostrarProgress = false
    
  }

 
  pesquisar() {
 
    this.mostrarProgress = true
    if((this.selectedCurso != 0) && (this.selectedNivel != null || this.selectedNivel != "") && (this.selectedTurno != null || this.selectedTurno != "")){

      // Criar Listas para cursos, turnos e niveis
      this.cursos.push(this.selectedCurso)
      this.turnos.push(this.selectedTurno)
      this.niveis.push(this.selectedNivel)
   

    
      // Exibir no console
      console.log("this.selectedCurso: ",this.selectedCurso)
      console.log("cursos:", this.cursos);
      console.log("turnos:", this.turnos);
      console.log("Niveis", this.niveis);
    }
    
      


  
    if (this.cursos != null && this.turnos != null && this.niveis != null) {
       

      console.log('Filtragem de Turmas:',this.cursos,this.turnos,this.niveis);
      this.adminService.getProf2(this.cursos,this.niveis,this.turnos)
        .pipe(
          map((response) => {
            console.log('Turmas Filtradas:', response);
            // Adicione aqui qualquer ação adicional após o cadastro.
            

            if(response != null){
              this.mostrarTurmas = true
              this.turmas = response
              this.mostrar2 = true
              this.mostrar1 = false
            }else{  
              this.mostrarTurmas = false
              this.mostrar1 = true
              this.mostrar2 = false
            }
            this.mostrarProgress = false
            this.mostrar3 = false
            
          }),
          catchError(error => {
            console.error('Erro ao Filtrar as Turmas:', error);
            // Trate os erros de requisição, se necessário.
            return throwError(() => new Error(error)); // Throw new Error
          }) 
        )
        .subscribe();
    } else {
      console.log('Formulário inválido. Verifique os campos.');
    }
    this.selectedCurso=0
    this.selectedNivel= ""
    this.selectedTurno = ""
  }


  matricular() {
 
    this.mostrarProgress = true
    if (this.selectedTurma != 0 && this.bi !=null && this.nome != null  ) {
       

      const aluno = {
        "nome": this.nome,
        "bi":   this.bi
      }
      console.log('Aluno: ',aluno);
      console.log("idTurma: ", this.selectedTurma)
      this.secretariaService.matricularAluno(this.selectedTurma,aluno)
        .pipe(
          map((response) => {
            console.log('Resultado da Matricula:', response);
            console.log('Relatorio String:', response.novoRelatorio);
            // Adicione aqui qualquer ação adicional após o cadastro.
            
            this.mostrarTurmas = false
            
            this.mensagem = response.mensagem
            this.mostrar1 = true
            this.mostrar2 = false
            this.mostrar3 = false
            this.sucesso = true
            this.mostrarProgress = false
            this.relatorio = response
            this.configurarRelatorio(response.relatorio);
            // relatorio em bytes
            //const relatorio = this.relatorio.relatorio
            //const base64Pdf = "data:application/pdf;base64,"+ Base64.encodeBase64String(pdfByte);
            //this.relatorioArrayBuffer = response
            //this.getPdfUrl()
            
            // Manipule o relatório recebido, por exemplo, exibindo em um visor PDF
             //this.exibirRelatorio(response.relatorio);
            
          }),
          catchError(error => {
            console.error('Falha ao Fazer a matricula:', error);
            // Trate os erros de requisição, se necessário.
            return throwError(() => new Error(error)); // Throw new Error
          }) 
        )
        .subscribe();
    } else {
      console.log('Formulário inválido. Verifique os campos.');
    }

    this.selectedCurso = 0
    this.selectedCurso = 0
    this.selectedTurno = ""
  }



   imprimirRelatorio(): void {
    this.mostrarProgress = false
    this.sucesso = false
    this.mostrar1 = false
    this.mostrar2 = false
    this.mostrar3 = true

  }

  fecharRelatorio(): void {
    this.mostrarProgress = false
    this.sucesso = false
    this.mostrar1 = true
    this.mostrar2 = false
    this.mostrar3 = false


  }

  private exibirRelatorio(relatorio: any): void {
    
    const iframe =  document.querySelector('iframe')
    if(iframe){
      console.log("Tem Iframe")
      iframe.src = relatorio    
      console.log("Relatorio Adicionado ao Iframe: ",iframe.src)  
    }
    
  }

  getPdfUrl2(){
    if (this.relatorioArrayBuffer ) {
       const blob = new Blob([this.relatorioArrayBuffer], { type: 'application/pdf' });
       const relatorio3 = this.sanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(blob));
       const conteudo = URL.createObjectURL(blob)  
       console.log("Conteudo",conteudo)
      
    }
  }
  getPdfUrl(): string | undefined {
    if (this.relatorioArrayBuffer) {
      const blob = new Blob([this.relatorioArrayBuffer], { type: 'application/pdf' });
      return URL.createObjectURL(blob);
    } else {
      return undefined;
    }
  }

   // Método para configurar a URL do relatório com o DomSanitizer
   configurarRelatorio(relatorioBase64: string) {
    this.relatorio2 = this.sanitizer.bypassSecurityTrustResourceUrl(relatorioBase64);
  }


}
