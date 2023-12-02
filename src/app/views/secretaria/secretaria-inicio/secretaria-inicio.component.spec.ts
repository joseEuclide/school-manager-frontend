import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecretariaInicioComponent } from './secretaria-inicio.component';

describe('SecretariaInicioComponent', () => {
  let component: SecretariaInicioComponent;
  let fixture: ComponentFixture<SecretariaInicioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SecretariaInicioComponent]
    });
    fixture = TestBed.createComponent(SecretariaInicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
