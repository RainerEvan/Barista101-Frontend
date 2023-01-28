import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Courses } from 'src/app/main/models/courses';
import { Enrollments } from 'src/app/main/models/enrollments';
import { AuthService } from 'src/app/main/services/auth/auth.service';
import { EnrollmentService } from 'src/app/main/services/enrollment/enrollment.service';

@Component({
  selector: 'app-course-progress',
  templateUrl: './course-progress.component.html',
  styleUrls: ['./course-progress.component.css']
})
export class CourseProgressComponent implements OnInit {

  @Input("course") course:Courses;
  enrollment:Enrollments;
  loading:boolean = false;

  constructor(private router:Router, private route:ActivatedRoute, private authService:AuthService, private enrollmentService:EnrollmentService) { }

  ngOnInit(): void {
    this.getEnrollmentForCourseAndAccount();
  }

  public getEnrollmentForCourseAndAccount(){
    const courseId = this.course.id;
    const accountId = this.authService.accountValue.accountId;

    this.loading = true;
    
    if(courseId){
      this.enrollmentService.getEnrollmentForCourseAndAccount(courseId, accountId).subscribe({
        next:(response:Enrollments)=>{
          this.enrollment = response;
          this.loading = false;
        },
        error:(error:any)=>{
          console.log(error);
        }
      });
    }
  }

  public addEnrollment(){
    const courseId = this.course.id;
    const accountId = this.authService.accountValue.accountId;

    this.enrollmentService.addEnrollment({courseId,accountId}).subscribe({
      next:(response:any)=>{
        this.enrollmentService.startCourse(response.data);
        this.router.navigate(['./',this.course.id],{relativeTo:this.route});
      },
      error:(error:any)=>{
        console.log(error);
      }
    });
  }

  startCourse()  {
    if(this.enrollment == null){
      this.addEnrollment();
    }
    if(this.enrollment){
      this.enrollmentService.startCourse(this.enrollment.id);
      this.router.navigate(['./',this.course.id],{relativeTo:this.route});
    }
  }
}
