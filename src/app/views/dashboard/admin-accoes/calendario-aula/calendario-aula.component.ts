import { Component, OnInit } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { FormBuilder, FormGroup, FormArray,Validators, FormControl } from '@angular/forms';
import { Calendario } from '../../model/Calendario';

@Component({
  selector: 'app-calendario-aula',
  templateUrl: './calendario-aula.component.html',
  styleUrls: ['./calendario-aula.component.css']
})
export class CalendarioAulaComponent {

  
  disciplinas: { nome: string, horarios: { diaAula: string, horaInicio: string, horaFim: string, tempo: string }[] }[] = [];
  diasSemana = ['Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira'];

  cadastrarCalendarios() {
    console.log('Dados dos Calendários:', this.disciplinas);
  }

  adicionarDisciplina() {
    this.disciplinas.push({
      nome: '',
      horarios: []
    });
  }

  adicionarHorario(disciplinaIndex: number) {
    this.disciplinas[disciplinaIndex].horarios.push({
      diaAula: '',
      horaInicio: '',
      horaFim: '',
      tempo: ''
    });
  }

  removerHorario(disciplinaIndex: number, horarioIndex: number) {
    this.disciplinas[disciplinaIndex].horarios.splice(horarioIndex, 1);
  }
  // Adicione esta função ao seu componente
  
  isDiaSelecionado(disciplina: any, dia: string): boolean {
    return disciplina.horarios.some((horario: any) => horario.diaAula === dia);
  }
  
  // Adicione esta função ao seu componente
  toggleDiaSelecionado(disciplina: any, dia: string) {
    const horarioIndex = disciplina.horarios.findIndex((horario: any) => horario.diaAula === dia);
    if (horarioIndex !== -1) {
      disciplina.horarios.splice(horarioIndex, 1);
    } else {
      disciplina.horarios.push({
        diaAula: dia,
        horaInicio: '', // Preencha com a lógica apropriada
        horaFim: '',    // Preencha com a lógica apropriada
        tempo: ''        // Preencha com a lógica apropriada
      });
    }
  }
  


}
