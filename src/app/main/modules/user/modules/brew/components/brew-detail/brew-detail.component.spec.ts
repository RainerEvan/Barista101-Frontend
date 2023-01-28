import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrewDetailComponent } from './brew-detail.component';

describe('BrewDetailComponent', () => {
  let component: BrewDetailComponent;
  let fixture: ComponentFixture<BrewDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BrewDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BrewDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
