import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecretariaAccoesComponent } from './secretaria-accoes.component';

describe('SecretariaAccoesComponent', () => {
  let component: SecretariaAccoesComponent;
  let fixture: ComponentFixture<SecretariaAccoesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SecretariaAccoesComponent]
    });
    fixture = TestBed.createComponent(SecretariaAccoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
