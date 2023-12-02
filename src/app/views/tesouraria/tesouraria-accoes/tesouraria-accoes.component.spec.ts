import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TesourariaAccoesComponent } from './tesouraria-accoes.component';

describe('TesourariaAccoesComponent', () => {
  let component: TesourariaAccoesComponent;
  let fixture: ComponentFixture<TesourariaAccoesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TesourariaAccoesComponent]
    });
    fixture = TestBed.createComponent(TesourariaAccoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
