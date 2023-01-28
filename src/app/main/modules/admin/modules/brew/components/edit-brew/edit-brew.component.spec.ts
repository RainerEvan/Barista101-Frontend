import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBrewComponent } from './edit-brew.component';

describe('EditBrewComponent', () => {
  let component: EditBrewComponent;
  let fixture: ComponentFixture<EditBrewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditBrewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditBrewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
