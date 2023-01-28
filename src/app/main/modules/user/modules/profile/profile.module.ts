import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileDetailComponent } from './components/profile-detail/profile-detail.component';
import { MyForumComponent } from './components/my-forum/my-forum.component';
import { MyRecipeComponent } from './components/my-recipe/my-recipe.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { camera, chatAlt2, clipboardList, eye, eyeOff, HeroIconModule, pencilAlt, star } from 'ng-heroicon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../../shared/shared.module';


@NgModule({
  declarations: [
    ProfileDetailComponent,
    MyForumComponent,
    MyRecipeComponent,
    EditProfileComponent,
    ChangePasswordComponent
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    HeroIconModule.withIcons(
      {
        chatAlt2,
        clipboardList,
        star,
        camera,
        pencilAlt,
        eye,
        eyeOff
      }
    )
  ]
})
export class ProfileModule { }
