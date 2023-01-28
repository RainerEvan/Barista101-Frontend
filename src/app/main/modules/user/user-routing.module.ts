import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './components/user/user.component';

const routes: Routes = [
  {
    path: '',
    component: UserComponent,
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
        path: 'profile',
        loadChildren: () => import('./modules/profile/profile.module').then((m) => m.ProfileModule),
      },
      {
        path: 'notification',
        loadChildren: () => import('./modules/notification/notification.module').then((m) => m.NotificationModule),
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
