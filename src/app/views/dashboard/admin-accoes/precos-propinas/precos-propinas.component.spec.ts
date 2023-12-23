import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrecosPropinasComponent } from './precos-propinas.component';

describe('PrecosPropinasComponent', () => {
  let component: PrecosPropinasComponent;
  let fixture: ComponentFixture<PrecosPropinasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PrecosPropinasComponent]
    });
    fixture = TestBed.createComponent(PrecosPropinasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
