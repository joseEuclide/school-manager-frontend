import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/shared/admin-service/admin.service';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Curso } from '../../model/curso';


@Component({
  selector: 'app-calendario-prova',
  templateUrl: './calendario-prova.component.html',
  styleUrls: ['./calendario-prova.component.css']
})
export class CalendarioProvaComponent  implements OnInit{

  disciplinas: any[] = [];
  diasSemana: string[] = ['Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira'];
  /*cursoInfo: any = {
    curso: '',
    nivel: '',
    turno: ''
  };*/

    curso: String = '';
    nivel: String = '';
    turno: String = '';
    cursos: Curso[] = [];

  constructor(private adminService : AdminService) {
   
  }

  ngOnInit(): void {
    this.adminService.getCursos().subscribe(cursos => {
      this.cursos = cursos;
    });
  }
  // Métodos para adicionar/remover disciplinas e horários
  adicionarDisciplina() {
    this.disciplinas.push({ nome: '', horarios: [] });
  }

  isDiaSelecionado(disciplina: any, dia: string): boolean {
    return disciplina.horarios.some((horario: any) => horario.diaAula === dia);
  }
  

  toggleDiaSelecionado(disciplina: any, dia: string) {
    const index = disciplina.horarios.findIndex((horario: any) => horario.diaAula === dia);
    if (index !== -1) {
      disciplina.horarios.splice(index, 1);
    } else {
      disciplina.horarios.push({ diaAula: dia, horaInicio: '', horaFim: '', tempo: '' });
    }
  }
  

  adicionarHorario(index: number) {
    this.disciplinas[index].horarios.push({ diaAula: '', horaInicio: '', horaFim: '', tempo: '' });
  }

  removerHorario(disciplinaIndex: number, horarioIndex: number) {
    this.disciplinas[disciplinaIndex].horarios.splice(horarioIndex, 1);
  }

  cadastrarCalendarios() {
    const dadosCalendarios = {
      curso: this.curso,
      turno: this.turno,
      nivel: this.nivel,
      dados: this.disciplinas
    };
    console.log('Dados dos Calendários:1 ', JSON.stringify(dadosCalendarios, null, 2));
    //console.log('Dados dos Calendários2: ', dadosCalendarios.cursoInfo);
    console.log('Dados dos Calendários:3 ', dadosCalendarios.dados);
  
    this.adminService.criarPagarFuncionarios(JSON.stringify(dadosCalendarios, null, 2))
    .pipe(
      map((response) => {
        console.log('  ********************  Calendario de Provas Cadastrados Com Sucesso:', response);
        // Adicione aqui qualquer ação adicional após o cadastro.
       
      }),
      catchError(error => {
        console.error('Erro Ao cadastrar o Calendario de provas:', error);
        // Trate os erros de requisição, se necessário.
        return throwError(() => new Error(error)); // Throw new Error
      }) 
    )
    .subscribe();

    //dadosCalendarios.cursoInfo = null
    dadosCalendarios.dados = []
    
  }



}
