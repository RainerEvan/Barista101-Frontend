import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './components/user/user.component';
import { HeaderComponent } from './components/header/header.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { academicCap, beaker, bell, chatAlt2, chevronDown, chevronLeft, clipboardList, HeroIconModule } from 'ng-heroicon';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    UserComponent,
    HeaderComponent,
    NavbarComponent,
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedModule,
    HeroIconModule.withIcons(
      {
        academicCap,
        chatAlt2,
        clipboardList,
        beaker,
        bell,
        chevronDown,
        chevronLeft,
      }
    )
  ]
})
export class UserModule { }
