import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrewDetailComponent } from './components/brew-detail/brew-detail.component';
import { BrewListComponent } from './components/brew-list/brew-list.component';

const routes: Routes = [
  {
    path: '',
    component: BrewListComponent,
  },
  {
    path: ':id',
    component: BrewDetailComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BrewRoutingModule { }
