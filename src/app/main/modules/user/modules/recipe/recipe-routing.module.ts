import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddRecipeComponent } from './components/add-recipe/add-recipe.component';
import { CategoryDetailComponent } from './components/category-detail/category-detail.component';
import { RecipeDetailComponent } from './components/recipe-detail/recipe-detail.component';
import { RecipeListComponent } from './components/recipe-list/recipe-list.component';

const routes: Routes = [
  {
    path: '',
    component: RecipeListComponent,
  },
  {
    path: 'detail/:id',
    component: RecipeDetailComponent,
  },
  {
    path: 'category/:id',
    component: CategoryDetailComponent,
  },
  {
    path: 'add',
    component: AddRecipeComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecipeRoutingModule { }
