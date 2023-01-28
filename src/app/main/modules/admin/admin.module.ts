import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './components/admin/admin.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { chevronDown, HeroIconModule } from 'ng-heroicon';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    AdminComponent,
    NavbarComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    HeroIconModule.withIcons(
      {
        chevronDown,
      }
    )
  ]
})
export class AdminModule { }
