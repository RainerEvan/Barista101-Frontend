import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeRatingListComponent } from './recipe-rating-list.component';

describe('RecipeRatingListComponent', () => {
  let component: RecipeRatingListComponent;
  let fixture: ComponentFixture<RecipeRatingListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecipeRatingListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecipeRatingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
