import { DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';
import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModuleService } from 'src/app/main/services/module/module.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-edit-module',
  templateUrl: './edit-module.component.html',
  styleUrls: ['./edit-module.component.css']
})
export class EditModuleComponent implements OnInit {

  moduleForm:FormGroup;
  isModuleFormSubmitted:boolean = false;
  thumbnail:any;
  imageUrl:any;

  constructor(public dialogRef:DialogRef, @Inject(DIALOG_DATA) public data:any, private moduleService:ModuleService, private formBuilder:FormBuilder) {}

  ngOnInit(): void {
    this.generateModuleForm();
    this.imageUrl = environment.apiUrl+"/module/thumbnail/"+this.data.module.id;
  }

  generateModuleForm(){
    this.moduleForm = this.formBuilder.group({
      title: [this.data.module.title, [Validators.required]],
    });
  }

  public editModule(): void{
    if(this.moduleForm.valid){
      const formData = new FormData();
      const module = this.moduleForm.value;

      formData.append('image',this.thumbnail);
      formData.append('moduleId', new Blob([JSON.stringify(this.data.module.id)], {type:"application/json"}));
      formData.append('module', new Blob([JSON.stringify(module)], {type:"application/json"}));
      
      this.moduleService.editModule(formData).subscribe({
        next: (result: any) => {
          console.log(result);
          this.isModuleFormSubmitted = true;
          this.dialogRef.close(this.isModuleFormSubmitted);
        },
        error: (error: any) => {
          console.log(error);
          this.isModuleFormSubmitted = false;
          this.dialogRef.close(this.isModuleFormSubmitted);
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
