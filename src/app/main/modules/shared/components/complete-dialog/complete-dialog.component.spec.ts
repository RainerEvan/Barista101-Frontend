import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompleteDialogComponent } from './complete-dialog.component';

describe('CompleteDialogComponent', () => {
  let component: CompleteDialogComponent;
  let fixture: ComponentFixture<CompleteDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompleteDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
