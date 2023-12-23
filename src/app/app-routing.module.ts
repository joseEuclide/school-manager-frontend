import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { LoginComponent } from './views/login/login/login.component';
import { TesourariaHomeComponent } from './views/tesouraria/tesouraria-home/tesouraria-home.component';
import { SecretariaHomeComponent } from './views/secretaria/secretaria-home/secretaria-home.component';
import { AlunoComponent } from './views/aluno/aluno/aluno.component';
import { ProfessorHomeComponent } from './views/professor/professor-home/professor-home.component';
import { AdminComponent } from './views/admin/admin/admin.component';

const routes: Routes = [
  
  {
    path: "",
    component: LoginComponent
  },
  {
    path: "cadastrar-admin",
    component: AdminComponent
  },
  {
    path: "admin",
    component: DashboardComponent
  },
  {
    path: "tesou",
    component: TesourariaHomeComponent
  },
  {
    path: "secret",
    component: SecretariaHomeComponent
  },
  {
    path: "aluno",
    component: AlunoComponent
  },
  {
    path: "prof",
    component: ProfessorHomeComponent
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
