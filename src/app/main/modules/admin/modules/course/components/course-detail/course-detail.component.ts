import { Dialog } from '@angular/cdk/dialog';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Courses } from 'src/app/main/models/courses';
import { CourseService } from 'src/app/main/services/course/course.service';
import { EditCourseComponent } from '../edit-course/edit-course.component';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.css']
})
export class CourseDetailComponent implements OnInit {

  course:Courses;
  loading:boolean = false;

  constructor(public dialog:Dialog, private route:ActivatedRoute,private courseService:CourseService) { }

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
          this.loading = false;
        },
        error:(error:any)=>{
            console.log(error);
        }
      });
    }
  }

  openEditDialog(){
    const dialogRef = this.dialog.open(EditCourseComponent, {
      data:{
        title:"Edit Course",
        course:this.course
      }
    });

    dialogRef.closed.subscribe((success) => {
      if(success){
        this.getCourse();
      }
    });
  }

}
