import { DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';
import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContentService } from 'src/app/main/services/content/content.service';

@Component({
  selector: 'app-add-content',
  templateUrl: './add-content.component.html',
  styleUrls: ['./add-content.component.css']
})
export class AddContentComponent implements OnInit {

  contentForm:FormGroup;
  isContentFormSubmitted:boolean = false;
  thumbnail:any;
  imageUrl:any;

  constructor(public dialogRef:DialogRef, @Inject(DIALOG_DATA) public data:any, private contentService:ContentService, private formBuilder:FormBuilder) {}

  ngOnInit(): void {
    this.generateContentForm();
  }

  generateContentForm(){
    this.contentForm = this.formBuilder.group({
      moduleId: [this.data.moduleId],
      title: [null, [Validators.required]],
      body: [null, [Validators.required]],
    });
  }

  public addContent(): void{
    if(this.contentForm.valid){
      const formData = new FormData();
      const content = this.contentForm.value;

      formData.append('image',this.thumbnail);
      formData.append('content', new Blob([JSON.stringify(content)], {type:"application/json"}));

      this.contentService.addContent(formData).subscribe({
        next: (result: any) => {
          console.log(result);
          this.isContentFormSubmitted = true;
          this.dialogRef.close(this.isContentFormSubmitted);
        },
        error: (error: any) => {
          console.log(error);
          this.isContentFormSubmitted = false;
          this.dialogRef.close(this.isContentFormSubmitted);
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

  resetForm(form: FormGroup){
    form.reset();
    this.thumbnail = null;
  }

  closeDialog(){
    this.dialogRef.close();
  }

}
