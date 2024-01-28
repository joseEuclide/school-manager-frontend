import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AdminService } from 'src/app/shared/admin-service/admin.service';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Curso } from '../../model/curso';
import { DisciplinaModel } from '../../model/DisciplinaModel';

@Component({
  selector: 'app-disciplina',
  templateUrl: './disciplina.component.html',
  styleUrls: ['./disciplina.component.css']
})
export class DisciplinaComponent implements OnInit {
  selectedCurso: number = 1;
  cursos2: Curso[] = [];
  niveis: any[] = [
    { id: 10, nome: 'Nível10' },
    { id: 11, nome: 'Nível11' },
    { id: 12, nome: 'Nível12' },
    { id: 13, nome: 'Nível13' },
    // Adicione mais níveis conforme necessário
  ];

  disciplinas: DisciplinaModel[] = [];
  dadosCurso2 : any = null
  exibirMensagem = false
  mostrarProgress = false
  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.adminService.getCursos().subscribe(cursos => {
      this.cursos2 = cursos;
    });
    this.exibirMensagem = false
    this.mostrarProgress = false
  }

  adicionarDisciplina() {
    const novaDisciplina: DisciplinaModel = {
      Nome: '',
      Niveis: {}
    };
    this.disciplinas.push(novaDisciplina);
  }

  removerDisciplina(index: number) {
    this.disciplinas.splice(index, 1);
  }

  exibirNiveis(index: number) {
    this.disciplinas[index].exibirNiveis = !this.disciplinas[index].exibirNiveis;
  }

  cadastrarDisciplinas() {
    const dadosCurso = this.disciplinas.map((disciplina) => {
      const niveis: { [key: string]: boolean } = {};
      for (const nivel of this.niveis) {
        niveis['nivel' + nivel.id] = disciplina.Niveis[nivel.id];
      }
      return {
        Nome: disciplina.Nome,
        Niveis: niveis
      };
    });
    this.dadosCurso2 = dadosCurso
    console.log('Dados das disciplinas a serem cadastrados:', dadosCurso);
    console.log('idCurso:', this.selectedCurso);

    if (dadosCurso != null && this.selectedCurso != 0) {
      this.cadastrarDisciplina2()
    }
    // Resto do código para enviar os dados para o servidor
  }


  private cadastrarDisciplina2() {
    this.mostrarProgress = true
    if (this.dadosCurso2 != null && this.selectedCurso != 0) {
      console.log('Dados das disciplinas a serem cadastrados:', this.dadosCurso2);
      this.adminService.criarDiscisciplinas(this.dadosCurso2.value,this.selectedCurso)
        .pipe(
          map((response) => {
            console.log('Disciplinas cadastradas com sucesso:', response);
            // Adicione aqui qualquer ação adicional após o cadastro.
            this.exibirMensagem = true
            this.mostrarProgress = false
          }),
          catchError(error => {
            console.error('Erro ao cadastrar o curso:', error);
            // Trate os erros de requisição, se necessário.
            return throwError(() => new Error(error)); // Throw new Error
          }) 
        )
        .subscribe();
    } else {
      console.log('Formulário inválido. Verifique os campos.');
    }
  }
  
}
