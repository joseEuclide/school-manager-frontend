import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarioAulaComponent } from './calendario-aula.component';

describe('CalendarioAulaComponent', () => {
  let component: CalendarioAulaComponent;
  let fixture: ComponentFixture<CalendarioAulaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CalendarioAulaComponent]
    });
    fixture = TestBed.createComponent(CalendarioAulaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
