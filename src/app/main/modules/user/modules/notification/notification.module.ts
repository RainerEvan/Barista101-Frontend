import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotificationRoutingModule } from './notification-routing.module';
import { NotificationListComponent } from './components/notification-list/notification-list.component';
import { academicCap, badgeCheck, chatAlt, HeroIconModule, star } from 'ng-heroicon';


@NgModule({
  declarations: [
    NotificationListComponent
  ],
  imports: [
    CommonModule,
    NotificationRoutingModule,
    HeroIconModule.withIcons(
      {
        badgeCheck,
        star,
        chatAlt,
        academicCap
      }
    )
  ]
})
export class NotificationModule { }
