import { Dialog } from '@angular/cdk/dialog';
import { Component, OnInit } from '@angular/core';
import { Courses } from 'src/app/main/models/courses';
import { ConfirmationDialogComponent } from 'src/app/main/modules/shared/components/confirmation-dialog/confirmation-dialog.component';
import { CourseService } from 'src/app/main/services/course/course.service';
import { AddCourseComponent } from '../add-course/add-course.component';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent implements OnInit {

  courses:Courses[] = [];
  loading:boolean = false;

  constructor(public dialog:Dialog, private courseService:CourseService) { }

  ngOnInit(): void {
    this.getAllCourses();
  }

  public getAllCourses(){
    this.loading = true;
    
    this.courseService.getAllCourses().subscribe({
      next:(response:Courses[])=>{
        this.courses = response;
        this.loading = false;
      },
      error:(error:any)=>{
          console.log(error);
      }
    });
  }

  openAddDialog(){
    const dialogRef = this.dialog.open(AddCourseComponent, {
      data:{
        title:"Add Course",
      }
    });

    dialogRef.closed.subscribe((success) => {
      if(success){
        this.getAllCourses();
      }
    });
  }

  openDeleteDialog(courseId:string){
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data:{
        title:"Delete Course",
        description:"Are you sure you want to delete this course?"
      }
    });

    dialogRef.closed.subscribe((confirm) => {
      if(confirm){
        this.deleteCourse(courseId);
      }
    });
  }

  deleteCourse(courseId:string){
    this.courseService.deleteCourse(courseId).subscribe({
      next:(response:any)=>{
        this.getAllCourses();
        console.log(response);
      },
      error:(error:any)=>{
        console.log(error);
      }
    });
  }
}
