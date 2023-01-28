import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BrewRoutingModule } from './brew-routing.module';
import { BrewListComponent } from './components/brew-list/brew-list.component';
import { BrewDetailComponent } from './components/brew-detail/brew-detail.component';
import { SharedModule } from '../../../shared/shared.module';
import { check, HeroIconModule, minus, play, plus, rewind, fastForward, pause, clock, exclamation } from 'ng-heroicon';
import { EditDoseComponent } from './components/edit-dose/edit-dose.component';
import { PreparationsComponent } from './components/preparations/preparations.component';
import { StepsComponent } from './components/steps/steps.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SimulationComponent } from './components/simulation/simulation.component';


@NgModule({
  declarations: [
    BrewListComponent,
    BrewDetailComponent,
    EditDoseComponent,
    PreparationsComponent,
    StepsComponent,
    SimulationComponent
  ],
  imports: [
    CommonModule,
    BrewRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    HeroIconModule.withIcons(
      {
        play,
        plus,
        minus,
        check,
        rewind,
        fastForward,
        pause,
        clock,
        exclamation
      }
    )
  ]
})
export class BrewModule { }
