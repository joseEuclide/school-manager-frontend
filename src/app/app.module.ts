import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { MainContentComponent } from './views/dashboard/component/main-content/main-content.component';
import { NavbarComponent } from './views/dashboard/component/navbar/navbar.component';
import { FooterComponent } from './views/dashboard/component/footer/footer.component';
import { DisciplinaComponent } from './views/dashboard/admin-accoes/disciplina/disciplina.component';
import { TurmaComponent } from './views/dashboard/admin-accoes/turma/turma.component';
import { ProfessorComponent } from './views/dashboard/admin-accoes/professor/professor.component';
import { TesourariaComponent } from './views/dashboard/admin-accoes/tesouraria/tesouraria.component';
import { SecretariaComponent } from './views/dashboard/admin-accoes/secretaria/secretaria.component';
import { CalendarioProvaComponent } from './views/dashboard/admin-accoes/calendario-prova/calendario-prova.component';
import { CalendarioAulaComponent } from './views/dashboard/admin-accoes/calendario-aula/calendario-aula.component';
import { InfoEscolaComponent } from './views/dashboard/component/info-escola/info-escola.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {  ReactiveFormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import { HttpClientModule } from '@angular/common/http';
import { CursoComponent } from './views/dashboard/admin-accoes/curso/curso.component';
import { FormsModule } from '@angular/forms';
import { PermissaoComponent } from './views/dashboard/admin-accoes/permissao/permissao.component';
import { PagarComponent } from './views/dashboard/admin-accoes/pagar/pagar.component';
import { LoginComponent } from './views/login/login/login.component';  // Importe FormsModule
import {MatSelectModule} from '@angular/material/select';
import {NgFor} from '@angular/common';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { TesourariaInicioComponent } from './views/tesouraria/tesouraria-inicio/tesouraria-inicio.component';
import { TesourariaAccoesComponent } from './views/tesouraria/tesouraria-accoes/tesouraria-accoes.component';
import { TesourariaHomeComponent } from './views/tesouraria/tesouraria-home/tesouraria-home.component';
import { DetalhesAlunoComponent } from './views/tesouraria/tesouraria-accoes/detalhes-aluno/detalhes-aluno/detalhes-aluno.component';
import { AlunoComponent } from './views/aluno/aluno/aluno.component';
import { SecretariaHomeComponent } from './views/secretaria/secretaria-home/secretaria-home.component';
import { SecretariaAccoesComponent } from './views/secretaria/secretaria-accoes/secretaria-accoes.component';
import { SecretariaInicioComponent } from './views/secretaria/secretaria-inicio/secretaria-inicio.component';
import { AlunoInicioComponent } from './views/aluno/aluno-inicio/aluno-inicio.component';
import { PagamentoComponent } from './views/aluno/pagamento/pagamento.component';
import { NotaComponent } from './views/aluno/nota/nota.component';
import { ProfessorHomeComponent } from './views/professor/professor-home/professor-home.component';
import { ProfessorInicioComponent } from './views/professor/professor-inicio/professor-inicio.component';
import { ProfessorListComponent } from './views/professor/professor-list/professor-list.component';
import { VerNotasDialogComponent } from './views/professor/notas_alunos-dialog/ver-notas-dialog/ver-notas-dialog.component';
import { MatTableModule } from '@angular/material/table';
import { PrecosPropinasComponent } from './views/dashboard/admin-accoes/precos-propinas/precos-propinas.component';
import { AdminComponent } from './views/admin/admin/admin.component';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    MainContentComponent,
    NavbarComponent,
    FooterComponent,
    DisciplinaComponent,
    TurmaComponent,
    ProfessorComponent,
    TesourariaComponent,
    SecretariaComponent,
    CalendarioProvaComponent,
    CalendarioAulaComponent,
    InfoEscolaComponent,
    CursoComponent,
    PermissaoComponent,
    PagarComponent,
    LoginComponent,
    TesourariaInicioComponent,
    TesourariaAccoesComponent,
    TesourariaHomeComponent,
    DetalhesAlunoComponent,
    AlunoComponent,
    SecretariaHomeComponent,
    SecretariaAccoesComponent,
    SecretariaInicioComponent,
    AlunoInicioComponent,
    PagamentoComponent,
    NotaComponent,
    ProfessorHomeComponent,
    ProfessorInicioComponent,
    ProfessorListComponent,
    VerNotasDialogComponent,
    PrecosPropinasComponent,
    AdminComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    HttpClientModule,
    FormsModule,
    MatSelectModule,
    MatTableModule,
    NgFor,
    NgMultiSelectDropDownModule.forRoot()

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
