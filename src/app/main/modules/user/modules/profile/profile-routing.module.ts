import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { MyForumComponent } from './components/my-forum/my-forum.component';
import { MyRecipeComponent } from './components/my-recipe/my-recipe.component';
import { ProfileDetailComponent } from './components/profile-detail/profile-detail.component';

const routes: Routes = [
  {
    path: '',
    component: ProfileDetailComponent,
    children: [
      {
        path: '',
        redirectTo: 'my-forum',
        pathMatch: 'full'
      },
      {
        path: 'my-forum',
        component: MyForumComponent,
      },
      {
        path: 'my-recipe',
        component: MyRecipeComponent,
      },
    ]
  },
  {
    path: 'edit',
    component: EditProfileComponent,
  },
  {
    path: 'change-password',
    component: ChangePasswordComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
