import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Courses } from 'src/app/main/models/courses';
import { CourseService } from 'src/app/main/services/course/course.service';
import { Dialog } from '@angular/cdk/dialog';
import { DescriptionDialogComponent } from 'src/app/main/modules/shared/components/description-dialog/description-dialog.component';
import { EnrollmentService } from 'src/app/main/services/enrollment/enrollment.service';
import { Enrollments } from 'src/app/main/models/enrollments';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.css']
})
export class CourseDetailComponent implements OnInit {

  course:Courses;
  enrollment:Enrollments;
  loading:boolean = false;

  constructor(public dialog:Dialog, private route:ActivatedRoute, private courseService:CourseService, private enrollmentService:EnrollmentService) { }

  ngOnInit(): void {
    this.getCourse();
  }

  public getCourse(){
    const courseId = this.route.snapshot.paramMap.get('id');

    this.loading = true;
    
    if(courseId){
      this.courseService.getCourse(courseId).subscribe({
        next:(response:Courses)=>{
          this.course = response;
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
          this.enrollment = response;
        },
        error:(error:any)=>{
            console.log(error);
        }
      });
    }
  }

  openDescriptionDialog(){
    this.dialog.open(DescriptionDialogComponent, {
      data:{
        title:this.course?.title,
        description:this.course?.description
      }
    });
  }
}
