import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessorInicioComponent } from './professor-inicio.component';

describe('ProfessorInicioComponent', () => {
  let component: ProfessorInicioComponent;
  let fixture: ComponentFixture<ProfessorInicioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfessorInicioComponent]
    });
    fixture = TestBed.createComponent(ProfessorInicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
