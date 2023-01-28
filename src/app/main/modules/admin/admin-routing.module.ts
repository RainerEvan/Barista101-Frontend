import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './components/admin/admin.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: '',
        redirectTo: 'course',
        pathMatch: 'full'
      },
      {
        path: 'course',
        loadChildren: () => import('./modules/course/course.module').then((m) => m.CourseModule),
      },
      {
        path: 'forum',
        loadChildren: () => import('./modules/forum/forum.module').then((m) => m.ForumModule),
      },
      {
        path: 'recipe',
        loadChildren: () => import('./modules/recipe/recipe.module').then((m) => m.RecipeModule),
      },
      {
        path: 'brew',
        loadChildren: () => import('./modules/brew/brew.module').then((m) => m.BrewModule),
      },
      {
        path: 'account',
        loadChildren: () => import('./modules/account/account.module').then((m) => m.AccountModule),
      },
      {
        path: 'profile',
        loadChildren: () => import('./modules/profile/profile.module').then((m) => m.ProfileModule),
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
