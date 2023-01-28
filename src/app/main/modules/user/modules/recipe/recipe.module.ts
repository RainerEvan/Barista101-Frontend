import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecipeRoutingModule } from './recipe-routing.module';
import { RecipeListComponent } from './components/recipe-list/recipe-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../../shared/shared.module';
import { chevronDown, dotsHorizontal, HeroIconModule, paperAirplane, photograph, plus, star, trash, xCircle } from 'ng-heroicon';
import { CategoryListComponent } from './components/category-list/category-list.component';
import { RecipeCarouselComponent } from './components/recipe-carousel/recipe-carousel.component';
import { RecipeDetailComponent } from './components/recipe-detail/recipe-detail.component';
import { CategoryDetailComponent } from './components/category-detail/category-detail.component';
import { AddRecipeComponent } from './components/add-recipe/add-recipe.component';
import { RecipeRatingListComponent } from './components/recipe-rating-list/recipe-rating-list.component';


@NgModule({
  declarations: [
    RecipeListComponent,
    CategoryListComponent,
    RecipeCarouselComponent,
    RecipeDetailComponent,
    CategoryDetailComponent,
    AddRecipeComponent,
    RecipeRatingListComponent,
  ],
  imports: [
    CommonModule,
    RecipeRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    HeroIconModule.withIcons(
      {
        plus,
        dotsHorizontal,
        trash,
        chevronDown,
        xCircle,
        photograph,
        paperAirplane,
        star
      }
    )
  ]
})
export class RecipeModule { }
