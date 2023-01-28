import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Enrollments } from 'src/app/main/models/enrollments';
import { Modules } from 'src/app/main/models/modules';
import { EnrollmentService } from 'src/app/main/services/enrollment/enrollment.service';
import { ModuleService } from 'src/app/main/services/module/module.service';

@Component({
  selector: 'app-module-list',
  templateUrl: './module-list.component.html',
  styleUrls: ['./module-list.component.css']
})
export class ModuleListComponent implements OnInit {

  modules:Modules[] = [];
  moduleStatus:any = [];
  loading:boolean = false;

  constructor(private route:ActivatedRoute, private moduleService:ModuleService, private enrollmentService:EnrollmentService) { }

  ngOnInit(): void {
    this.getAllModulesForCourse();
  }

  public getAllModulesForCourse(){
    const courseId = this.route.snapshot.paramMap.get('id');

    this.loading = true;
    
    if(courseId){
      this.moduleService.getAllModulesForCourse(courseId).subscribe({
        next:(response:Modules[])=>{
          this.modules = response;
          this.getEnrollment();
          this.loading = false;
        },
        error:(error:any)=>{
            console.log(error);
        }
      });
    }
  }

  public getEnrollment(){
    const enrollmentId = this.enrollmentService.currEnrollment;

    if(enrollmentId){
      this.enrollmentService.getEnrollment(enrollmentId).subscribe({
        next:(response:Enrollments)=>{
          this.moduleStatus = JSON.parse(response.moduleStatus);
        },
        error:(error:any)=>{
            console.log(error);
        }
      });
    }
  }
}
