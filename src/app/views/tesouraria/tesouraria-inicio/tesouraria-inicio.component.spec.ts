import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TesourariaInicioComponent } from './tesouraria-inicio.component';

describe('TesourariaInicioComponent', () => {
  let component: TesourariaInicioComponent;
  let fixture: ComponentFixture<TesourariaInicioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TesourariaInicioComponent]
    });
    fixture = TestBed.createComponent(TesourariaInicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
