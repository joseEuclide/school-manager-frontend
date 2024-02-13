import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Curso } from 'src/app/views/dashboard/model/curso';
import { turmaDTO2 } from 'src/app/views/dashboard/model/turmaDTO2';
import { PrecosPropina } from 'src/app/model/precos/precos.interface';
import { AdminModel } from 'src/app/model/admin/admin.interface';
import { DetalheProfessorModel } from 'src/app/model/professor/detralheProfessor.interface';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  apiUrl = 'http://localhost:8080/';
  httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

  constructor(
      private httpClient: HttpClient
  ) {}

  
  /*
  public getLivesWithFlag(flag: string): Observable<ResponsePageable> {
      return this.httpClient.get<ResponsePageable>(this.apiUrl + '?flag=' + flag);
  }
   */
  public getCursos(): Observable<Curso[]> {
    return this.httpClient.get<Curso[]>(this.apiUrl+'todos-cursos');
  }
  public getCursos2(): Observable<PrecosPropina[]> {
    return this.httpClient.get<PrecosPropina[]>(this.apiUrl+'todos-cursos');
  }
  public criarCurso(curso: any): Observable<any> {  
      return this.httpClient.post<any>(this.apiUrl+"cadastrar-Curso", curso, this.httpOptions);
  }
  public criarDiscisciplinas(disciplinas: any, idCurso : any): Observable<any> {
    return this.httpClient.post<any>(this.apiUrl+'cadastrar-disciplina/'+idCurso, disciplinas, this.httpOptions);
  }
  public criarTurma(turma: any,cursoId : any): Observable<any> {
    return this.httpClient.post<any>(this.apiUrl+'cadastrar-turma/'+cursoId, turma, this.httpOptions);
  }
  public criarProf1(prof: any): Observable<any> {
    return this.httpClient.post<any>(this.apiUrl+'cadastrar-Professor', prof, this.httpOptions);
  }
 
  public getProf2(cursos: number[], niveis: string[], turnos: string[]): Observable<turmaDTO2[]> {
    const params = {
      cursos: cursos.join(','),
      niveis: niveis.join(','),
      turnos: turnos.join(',')
    };

    // Enviar os parâmetros como parte da requisição
    const request = this.apiUrl+'filtrar-turmas-para-o-professor/?cursos='+cursos+"&niveis="+niveis+"&turnos="+turnos
    console.log("params"+params)
    return this.httpClient.get<turmaDTO2[]>(request);
  }

  public criarProf2(professorDados: any): Observable<any> {
    console.log("professorDados:  ",professorDados)
    return this.httpClient.post<any>(this.apiUrl+'cadastrar-Professor-2', professorDados, this.httpOptions);
  }
  public criarSecretarios(secretarios: any): Observable<any> {
    console.log("secretarios:  ",secretarios)
    return this.httpClient.post<any>(this.apiUrl+'cadastrar-secretarios', secretarios, this.httpOptions);
  }
  public criarTesoureiros(tesoureiros: any): Observable<any> {
    console.log("tesoureiros:  ",tesoureiros)
    return this.httpClient.post<any>(this.apiUrl+'cadastrar-tesoureiros', tesoureiros, this.httpOptions);
  }
  public criarPermissao(permissaao: any): Observable<DetalheProfessorModel> {
    console.log("permissaao:  ",permissaao)
    return this.httpClient.post<DetalheProfessorModel>(this.apiUrl+'Atribuir-E-Remover-permissoes', permissaao, this.httpOptions);
  }
  public criarPagarFuncionarios(pagar: any): Observable<any> {
    console.log("permissaao:  ",pagar)
    return this.httpClient.post<any>(this.apiUrl+'cadastrar-salarios', pagar, this.httpOptions);
  }

  public criarCalendarioProvas(calendariosProvas: any): Observable<AdminModel> {
    console.log("calendariosProvas:  ",calendariosProvas)
    return this.httpClient.post<AdminModel>(this.apiUrl+'cadastrar-Calendario-Provas', calendariosProvas, this.httpOptions);
  }
  public criarCalendarioAulas(calendariosAulas: any): Observable<any> {
    console.log("calendariosAulas:  ",calendariosAulas)
    return this.httpClient.post<any>(this.apiUrl+'cadastrar-Calendario-Aulas', calendariosAulas, this.httpOptions);
  }

  public criarAdmin(admin: any): Observable<AdminModel> {
    console.log("admin:  ",admin)
    return this.httpClient.post<AdminModel>(this.apiUrl+'cadastrar-admin', admin, this.httpOptions);
  }


}
