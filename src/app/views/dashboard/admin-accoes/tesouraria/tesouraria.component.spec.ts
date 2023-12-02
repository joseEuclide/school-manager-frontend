import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TesourariaComponent } from './tesouraria.component';

describe('TesourariaComponent', () => {
  let component: TesourariaComponent;
  let fixture: ComponentFixture<TesourariaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TesourariaComponent]
    });
    fixture = TestBed.createComponent(TesourariaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
