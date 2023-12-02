import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TesourariaHomeComponent } from './tesouraria-home.component';

describe('TesourariaHomeComponent', () => {
  let component: TesourariaHomeComponent;
  let fixture: ComponentFixture<TesourariaHomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TesourariaHomeComponent]
    });
    fixture = TestBed.createComponent(TesourariaHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
