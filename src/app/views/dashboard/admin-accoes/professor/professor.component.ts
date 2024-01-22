import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/shared/admin-service/admin.service';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { turmaDTO2 } from '../../model/turmaDTO2';
import { FormBuilder, FormGroup, FormArray,Validators, FormControl } from '@angular/forms';
import { ProfessorDisciplinasTurma } from '../../model/ProfessorDisciplinasTurma';
import { IDropdownSettings } from 'ng-multiselect-dropdown';

interface Curso {
  id: number
  nome: String;
}
interface dropdownList2 {
  id:number;
  nome: string;
  
}
interface Turma {
  id:number;
  nome: String;
  disciplinas:String[];
  
}

@Component({
  selector: 'app-professor',
  templateUrl: './professor.component.html',
  styleUrls: ['./professor.component.css']
})
export class ProfessorComponent {

  dadosForm!: FormGroup;
  profForm2!: FormGroup;
  idProf! : number
  mostrar1 : boolean = false
  mostrar2 : boolean = false
  mostrar3 : boolean = false
  mostrar4 : boolean = false
  mostrarTurmas : boolean = false
  mostrarMensagem : boolean = false
  exibirNiveis: boolean = false;
  niveis: any[] = [
    { id: '1', nome: '10', checked: false },
    { id: '2', nome: '11', checked: false },
    { id: '3', nome: '12', checked: false },
    { id: '4', nome: '13', checked: false },
    // Adicione outras opções de níveis conforme necessário
  ];
  //turmas : turmaDTO2[]=[]

   dadosProf! : ProfessorDisciplinasTurma[]


  turmas :Turma[] = [];
  disciplinasSelecionadas: { [turmaId: number]: string[] } = {};
 
  niveis2: string[]=[]

  escolhasPorTurma: { [turmaId: number]: string[] } = {};
  turmasSelecionadas: { idProf: number, idTurma: number, disciplinas: string[] }[] = [];


  
  

  cursosSelecionados: Curso[] = [];
  cursos :Curso[]=[];
  selectedItems_Curso :Curso[]=[];
  dropdownSettings_Curso!:IDropdownSettings; 

  dropdownList_Niveis : dropdownList2[] = [];
  selectedItems_Niveis : dropdownList2[] = [];
  dropdownSettings_Niveis:IDropdownSettings={}

  dropdownList_Turnos : dropdownList2[] = [];
  selectedItems_Turnos : dropdownList2[] = [];
  dropdownSettings_Turnos:IDropdownSettings={}
  // Inicialize listas vazias para armazenar os IDs e nomes
   ids_Cursos: number[] = [];
   nomes_niveis: string[] = [];
   nomes_turnos: string[] = [];
   cadastroSucesso : Boolean = false;


  constructor(public fb: FormBuilder,private adminService : AdminService) {
    this.dadosForm = this.fb.group({
      cursos: [[]],  // Inicialize com um array vazio
      niveis: [[]],  // Inicialize com um array vazio
      turnos: [[]]   // Inicialize com um array vazio
    });
   

  }



  ngOnInit(): void {
    this.profForm2 = this.fb.group({
      nome: ['', [Validators.required]],
      bi: ['', [Validators.required]]
    });
    this.mostrar1 = true
    this.mostrar2 = false
    this.mostrar3 = false
    this.mostrar4 = false
    this.exibirNiveis = false
    this.mostrarMensagem = false
    this.mostrarTurmas = false
    this.cadastroSucesso = false

    this.dropdownSettings_Curso = {
      singleSelection: false,
      idField: 'id',
      textField: 'nome',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      allowSearchFilter: true
    };

    this.dropdownSettings_Niveis = {
      singleSelection: false,
      idField: 'id',
      textField: 'nome',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      allowSearchFilter: true
    };

    this.adminService.getCursos().subscribe(cursos => {
      this.cursos = cursos;
    });

    this.dropdownList_Niveis = [
      { id:1, nome: '10' },
      { id:2, nome: '11' },
      { id:3, nome: '12' },
      { id:4, nome: '13' },
    ];

    this.dropdownList_Turnos = [
      { id:1, nome: 'Manha' },
      { id:2, nome: 'Tarde' },
      { id:3, nome: 'Noite' },
    ];
  
    this.dropdownSettings_Niveis={
      singleSelection: false,
      idField: 'id',
      textField: 'nome',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      allowSearchFilter: true
    };

    this.dropdownSettings_Turnos={
      singleSelection: false,
      idField: 'id',
      textField: 'nome',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      allowSearchFilter: true
    };

  }   
  onItemSelect_Curso(item: any) {
    console.log("Selecao de curso")
    this.selectedItems_Curso.push(item)
    console.log(item);
  }
  onSelectAll_Curso(items: any) {
    console.log(items);
  }

  onItemSelect_Niveis(item: any) {
    console.log("Selecao de nivei")
    this.selectedItems_Niveis.push(item)
    console.log(item);
  }
  onSelectAll_Niveis(items: any) {
    console.log(items);
  }

  onItemSelect_Turnos(item: any) {
    console.log("Selecao de Turnos")
    this.selectedItems_Turnos.push(item)
    console.log(item);
  }
  onSelectAll_Turnos(items: any) {
    console.log(items);
  }

  onItemDeselect_Curso(item: any) {
    // Use o método 'filter' para criar uma nova lista excluindo o item desselecionado
    this.selectedItems_Curso = this.selectedItems_Curso.filter((selectedItem) => selectedItem !== item);
  }
  
  


  cadastrarProf1() {
    if (this.profForm2.valid) {
      console.log('Dados do curso a serem cadastrados:', this.profForm2.value);
      this.adminService.criarProf1(this.profForm2.value)
        .pipe(
          map((response) => {
            console.log('Curso cadastrado com sucesso:', response);
            // Adicione aqui qualquer ação adicional após o cadastro.
            this.mostrar1 = false
            this.mostrar2 = true
            this.mostrar3 = true
            this.mostrar4 = false
            this.idProf = response.id
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
    this.mostrar1 = false
            this.mostrar2 = true
            this.mostrar3 = true
            this.mostrar4 = false
  }

  cadastrarProf2() {
    console.log("niveis2",this.niveis2)
    // Criar um array com os IDs dos cursos selecionados
    const selectedCourseIds = this.selectedItems_Curso.map((curso) => curso.id);

    // Criar um array com os IDs dos cursos selecionados
    const selectedNiveis = this.selectedItems_Niveis.map((nivel) => nivel.nome);
     
    // Criar um array com os IDs dos cursos selecionados
    const selectedTurnos = this.selectedItems_Turnos.map((turno) => turno.nome);
    
    // Recupere o campo "id" de cada item em selectedItems_Curso
    this.selectedItems_Curso.forEach((item) => {
      this.ids_Cursos.push(item.id);
    });

    // Recupere o campo "nome" de cada item em selectedItems_Niveis
    this.selectedItems_Niveis.forEach((item) => {
      this.nomes_niveis.push(item.nome);
    });

    // Recupere o campo "nome" de cada item em selectedItems_Niveis
    this.selectedItems_Turnos.forEach((item) => {
      this.nomes_turnos.push(item.nome);
    });
    // Exibir no console
    console.log("IDs dos cursos selecionados:", selectedCourseIds);
    console.log("IDs dos niveis selecionados:", selectedNiveis);
    console.log("IDs dos turnos selecionados:", selectedTurnos);


    console.log("this.selectedItems_Curso:",this.selectedItems_Curso)
    console.log("this.selectedItems_Niveis:",this.selectedItems_Niveis)
    console.log("this.selectedItems_Turnos:",this.selectedItems_Turnos)
    this.simularEnvioDeDados()
    if (this.dadosForm.valid) {
      const dados = this.dadosForm.value;
      console.log("dados"+dados)
        // Acesso aos dados de cada campo
        const cursosSelecionados = dados.cursos;
        const niveisSelecionados = dados.niveis;
        const turnosSelecionados = dados.turnos;

      console.log('Filtragem de Turmas:', this.dadosForm.value);
      this.adminService.getProf2(this.ids_Cursos,this.nomes_niveis,this.nomes_turnos)
        .pipe(
          map((response) => {
            console.log('Turmas Filtradas:', response);
            // Adicione aqui qualquer ação adicional após o cadastro.
            this.mostrar1 = false
            this.mostrar2 = true
            this.mostrar3 = false
            this.mostrar4 = true

            if(response != null){
              this.mostrarMensagem = false
              this.mostrarTurmas = true
              this.turmas = response
            }else{  
              this.mostrarMensagem = true
              this.mostrarTurmas = false
            }
            
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
    this.mostrar1 = false
            this.mostrar2 = true
            this.mostrar3 = false
            this.mostrar4 = true
  }

  

  cadastrarProf3() {

    this.mostrarResultadoFinal()
    console.log("this.turmasSelecionadas:  ",this.turmasSelecionadas)
    
        
        this.adminService.criarProf2(this.turmasSelecionadas)
        .pipe(
          map((response) => {
            console.log('  ********************  Turmas Adicionadas ao Professor:', response);
            // Adicione aqui qualquer ação adicional após o cadastro.
           
            this.mostrar1 = true
            this.mostrar2 = false
            this.mostrar3 = false
            this.mostrar4 = false
            this.cadastroSucesso = true

        
          }),
          catchError(error => {
            console.error('Erro Ao Adicionar as Turmas ao Professor:', error);
            // Trate os erros de requisição, se necessário.
            return throwError(() => new Error(error)); // Throw new Error
          }) 
        )
        .subscribe();    
        this.profForm2.reset();
  }

  mostrarNiveis(){
    this.exibirNiveis = true
  }

  fecharMensagem() {
     this.cadastroSucesso = false;
  }


   private simularEnvioDeDados() {
    const niveisSelecionados = this.niveis
      .filter(nivel => nivel.checked)
      .map(nivel => nivel.id.toString());

    console.log('IDs dos Níveis Selecionados:', niveisSelecionados);
  }
  
    onItemSelect_Disciplinas(item: any, turma: any) {
    const index = this.turmasSelecionadas.findIndex((resultado) => resultado.idTurma === turma.id);
    if (index !== -1) {
      this.turmasSelecionadas[index].idProf = this.idProf
      this.turmasSelecionadas[index].disciplinas.push(item);
    } else {
      this.turmasSelecionadas.push({
        idProf: this.idProf, // Define o id do professor conforme sua necessidade
        idTurma: turma.id,
        disciplinas: [item]
      });
    }
  }

  onSelectAll_Disciplinas(items: any[], turma: any) {
    const index = this.turmasSelecionadas.findIndex((resultado) => resultado.idTurma === turma.id);
    if (index !== -1) {
      this.turmasSelecionadas[index].idProf = this.idProf
      this.turmasSelecionadas[index].disciplinas = items;
    } else {
      this.turmasSelecionadas.push({
        idProf: 1, // Define o id do professor conforme sua necessidade
        idTurma: turma.id,
        disciplinas: items
      });
    }
  }


  onDeSelect_Disciplinas(item: any, turma: any) {
    const index = this.turmasSelecionadas.findIndex((turmaSelecionada) => turmaSelecionada.idTurma === turma.id);
    if (index !== -1) {
      const itemIndex = this.turmasSelecionadas[index].disciplinas.indexOf(item);
      if (itemIndex !== -1) {
        this.turmasSelecionadas[index].disciplinas.splice(itemIndex, 1);
      }
    }
  }

  // Adicione este método para exibir o resultado final no console
  mostrarResultadoFinal() {
    console.log(this.turmasSelecionadas);
  }

  voltar(){
    this.mostrar1 = false
    this.mostrar2 = true
    this.mostrar3 = true
    this.mostrar4 = false
  }
  
}
