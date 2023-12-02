import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarioProvaComponent } from './calendario-prova.component';

describe('CalendarioProvaComponent', () => {
  let component: CalendarioProvaComponent;
  let fixture: ComponentFixture<CalendarioProvaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CalendarioProvaComponent]
    });
    fixture = TestBed.createComponent(CalendarioProvaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
