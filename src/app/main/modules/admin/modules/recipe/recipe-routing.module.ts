import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryDetailComponent } from './components/category-detail/category-detail.component';
import { CategoryListComponent } from './components/category-list/category-list.component';
import { RecipeDetailComponent } from './components/recipe-detail/recipe-detail.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'category',
    pathMatch: 'full'
  },
  {
    path: 'category',
    component: CategoryListComponent,
  },
  {
    path: 'category/:id',
    component: CategoryDetailComponent,
  },
  {
    path: 'detail/:id',
    component: RecipeDetailComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecipeRoutingModule { }
