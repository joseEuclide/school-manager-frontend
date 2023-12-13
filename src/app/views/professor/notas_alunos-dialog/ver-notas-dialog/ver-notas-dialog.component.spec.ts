import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerNotasDialogComponent } from './ver-notas-dialog.component';

describe('VerNotasDialogComponent', () => {
  let component: VerNotasDialogComponent;
  let fixture: ComponentFixture<VerNotasDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VerNotasDialogComponent]
    });
    fixture = TestBed.createComponent(VerNotasDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
