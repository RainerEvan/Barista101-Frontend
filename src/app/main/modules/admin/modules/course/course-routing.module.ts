import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContentDetailComponent } from './components/content-detail/content-detail.component';
import { CourseDetailComponent } from './components/course-detail/course-detail.component';
import { CourseListComponent } from './components/course-list/course-list.component';
import { ModuleDetailComponent } from './components/module-detail/module-detail.component';

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
    component: ModuleDetailComponent
  },
  {
    path: 'content/:id',
    component: ContentDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CourseRoutingModule { }
