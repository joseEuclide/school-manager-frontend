import { Component, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProfessorModel } from 'src/app/model/professor/professor.interface';

@Component({
  selector: 'app-ver-notas-dialog',
  templateUrl: './ver-notas-dialog.component.html',
  styleUrls: ['./ver-notas-dialog.component.css']
})
export class VerNotasDialogComponent {

  @Input()  alunos2! : ProfessorModel[]

  constructor(
    public dialogRef: MatDialogRef<VerNotasDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public alunos: any[]
  ) {}

  close(): void {
    this.dialogRef.close();
  }

}
