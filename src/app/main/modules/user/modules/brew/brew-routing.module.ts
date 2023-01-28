import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrewListComponent } from './components/brew-list/brew-list.component';
import { BrewDetailComponent } from './components/brew-detail/brew-detail.component';
import { EditDoseComponent } from './components/edit-dose/edit-dose.component';
import { PreparationsComponent } from './components/preparations/preparations.component';
import { StepsComponent } from './components/steps/steps.component';
import { SimulationComponent } from './components/simulation/simulation.component';

const routes: Routes = [
  {
    path: '',
    component: BrewListComponent,
  },
  {
    path: 'detail/:id',
    component: BrewDetailComponent,
  },
  {
    path: 'dose',
    component: EditDoseComponent,
  },
  {
    path: 'preparations',
    component: PreparationsComponent,
  },
  {
    path: 'steps',
    component: StepsComponent,
  },
  {
    path: 'simulation',
    component: SimulationComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BrewRoutingModule { }
