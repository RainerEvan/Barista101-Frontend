import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CourseRoutingModule } from './course-routing.module';
import { CourseListComponent } from './components/course-list/course-list.component';
import { CourseDetailComponent } from './components/course-detail/course-detail.component';
import { ModuleListComponent } from './components/module-list/module-list.component';
import { HeroIconModule, pencil, photograph, plus, trash} from 'ng-heroicon';
import { ModuleDetailComponent } from './components/module-detail/module-detail.component';
import { ContentListComponent } from './components/content-list/content-list.component';
import { ContentDetailComponent } from './components/content-detail/content-detail.component';
import { AddCourseComponent } from './components/add-course/add-course.component';
import { AddModuleComponent } from './components/add-module/add-module.component';
import { AddContentComponent } from './components/add-content/add-content.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../../shared/shared.module';
import { EditCourseComponent } from './components/edit-course/edit-course.component';
import { EditModuleComponent } from './components/edit-module/edit-module.component';
import { EditContentComponent } from './components/edit-content/edit-content.component';

@NgModule({
  declarations: [
    CourseListComponent,
    CourseDetailComponent,
    ModuleListComponent,
    ModuleDetailComponent,
    ContentListComponent,
    ContentDetailComponent,
    AddCourseComponent,
    AddModuleComponent,
    AddContentComponent,
    EditCourseComponent,
    EditModuleComponent,
    EditContentComponent,
  ],
  imports: [
    CommonModule,
    CourseRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    HeroIconModule.withIcons(
      {
        plus,
        pencil,
        photograph,
        trash
      }
    )
  ]
})
export class CourseModule { }
