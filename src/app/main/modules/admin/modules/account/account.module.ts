import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { AccountListComponent } from './components/account-list/account-list.component';
import { AccountDetailComponent } from './components/account-detail/account-detail.component';
import { SharedModule } from '../../../shared/shared.module';


@NgModule({
  declarations: [
    AccountListComponent,
    AccountDetailComponent
  ],
  imports: [
    CommonModule,
    AccountRoutingModule,
    SharedModule,
  ]
})
export class AccountModule { }
