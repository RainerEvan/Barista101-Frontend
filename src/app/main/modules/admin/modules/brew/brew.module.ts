import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BrewRoutingModule } from './brew-routing.module';
import { BrewListComponent } from './components/brew-list/brew-list.component';
import { BrewDetailComponent } from './components/brew-detail/brew-detail.component';
import { AddBrewComponent } from './components/add-brew/add-brew.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../../shared/shared.module';
import { check, chevronDown, HeroIconModule, pencil, photograph, plus, trash, xCircle } from 'ng-heroicon';
import { EditBrewComponent } from './components/edit-brew/edit-brew.component';


@NgModule({
  declarations: [
    BrewListComponent,
    BrewDetailComponent,
    AddBrewComponent,
    EditBrewComponent
  ],
  imports: [
    CommonModule,
    BrewRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    HeroIconModule.withIcons(
      {
        plus,
        photograph,
        trash,
        pencil,
        xCircle,
        chevronDown,
        check
      }
    )
  ]
})
export class BrewModule { }
