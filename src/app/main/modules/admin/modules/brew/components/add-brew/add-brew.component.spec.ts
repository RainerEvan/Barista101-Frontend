import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBrewComponent } from './add-brew.component';

describe('AddBrewComponent', () => {
  let component: AddBrewComponent;
  let fixture: ComponentFixture<AddBrewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddBrewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddBrewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
