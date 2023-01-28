import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDoseComponent } from './edit-dose.component';

describe('EditDoseComponent', () => {
  let component: EditDoseComponent;
  let fixture: ComponentFixture<EditDoseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditDoseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditDoseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
