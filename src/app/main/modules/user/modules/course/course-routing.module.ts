import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourseDetailComponent } from './components/course-detail/course-detail.component';
import { CourseListComponent } from './components/course-list/course-list.component';
import { ModuleContentComponent } from './components/module-content/module-content.component';

const routes: Routes = [
  {
    path: '',
    component: CourseListComponent,
  },
  {
    path: ':id',
    component: CourseDetailComponent,
  },
  {
    path: 'module/:id',
    component: ModuleContentComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CourseRoutingModule { }
