import { DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';
import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CourseService } from 'src/app/main/services/course/course.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-edit-course',
  templateUrl: './edit-course.component.html',
  styleUrls: ['./edit-course.component.css']
})
export class EditCourseComponent implements OnInit {

  courseForm:FormGroup;
  isCourseFormSubmitted:boolean = false;
  thumbnail:any;
  imageUrl:any;

  constructor(public dialogRef:DialogRef, @Inject(DIALOG_DATA) public data:any, private courseService:CourseService, private formBuilder:FormBuilder) {}

  ngOnInit(): void {
    this.generateCourseForm();
    this.imageUrl = environment.apiUrl+"/course/thumbnail/"+this.data.course.id;
  }

  generateCourseForm(){
    this.courseForm = this.formBuilder.group({
      title: [this.data.course.title, [Validators.required]],
      description: [this.data.course.description, [Validators.required]],
    });
  }

  public editCourse(): void{
    if(this.courseForm.valid){
      const formData = new FormData();
      const course = this.courseForm.value;

      formData.append('image',this.thumbnail);
      formData.append('courseId', new Blob([JSON.stringify(this.data.course.id)], {type:"application/json"}));
      formData.append('course', new Blob([JSON.stringify(course)], {type:"application/json"}));
      
      this.courseService.editCourse(formData).subscribe({
        next: (result: any) => {
          console.log(result);
          this.isCourseFormSubmitted = true;
          this.dialogRef.close(this.isCourseFormSubmitted);
        },
        error: (error: any) => {
          console.log(error);
          this.isCourseFormSubmitted = false;
          this.dialogRef.close(this.isCourseFormSubmitted);
        }
      });
    } 
  }

  @HostListener("dragover", ["$event"]) onDragOver(event: any) {
    event.preventDefault();
  }
  @HostListener("dragleave", ["$event"]) onDragLeave(event: any) {
    event.preventDefault();
  }
  @HostListener("drop", ["$event"]) onDrop(event: any) {
    event.preventDefault();
    event.stopPropagation();
    if (event.dataTransfer.files) {
      this.thumbnail = event.dataTransfer.files[0];
      this.previewImage(this.thumbnail);
    }
  }

  onSelectFile(event:any){
    if(event.target.files.length > 0){
      this.thumbnail = event.target.files[0];
      this.previewImage(this.thumbnail);
    }
  }

  previewImage(image:any){
    var reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onload = (_event) => {
      this.imageUrl = reader.result;
    }
  }

  closeDialog(){
    this.dialogRef.close();
  }

}
