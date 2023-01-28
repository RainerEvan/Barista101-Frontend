import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecipeRoutingModule } from './recipe-routing.module';
import { CategoryListComponent } from './components/category-list/category-list.component';
import { RecipeDetailComponent } from './components/recipe-detail/recipe-detail.component';
import { SharedModule } from '../../../shared/shared.module';
import { dotsHorizontal, HeroIconModule, plus, star, trash } from 'ng-heroicon';
import { CategoryDetailComponent } from './components/category-detail/category-detail.component';
import { RecipeRatingListComponent } from './components/recipe-rating-list/recipe-rating-list.component';
import { AddCategoryComponent } from './components/add-category/add-category.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CategoryListComponent,
    RecipeDetailComponent,
    CategoryDetailComponent,
    RecipeRatingListComponent,
    AddCategoryComponent
  ],
  imports: [
    CommonModule,
    RecipeRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    HeroIconModule.withIcons(
      {
        dotsHorizontal,
        star,
        trash,
        plus
      }
    )
  ]
})
export class RecipeModule { }
