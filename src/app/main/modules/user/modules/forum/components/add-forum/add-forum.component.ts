import { Dialog } from '@angular/cdk/dialog';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ResultDialogComponent } from 'src/app/main/modules/shared/components/result-dialog/result-dialog.component';
import { AuthService } from 'src/app/main/services/auth/auth.service';
import { ForumService } from 'src/app/main/services/forum/forum.service';

@Component({
  selector: 'app-add-forum',
  templateUrl: './add-forum.component.html',
  styleUrls: ['./add-forum.component.css']
})
export class AddForumComponent implements OnInit {

  forumForm:FormGroup;
  loading:boolean = false;
  isForumFormSubmitted:boolean = false;
  thumbnail:any;
  imageUrl:any;
  @ViewChild('autotextarea') autosize: CdkTextareaAutosize;

  constructor(public dialog:Dialog, private authService:AuthService, private forumService:ForumService, private formBuilder:FormBuilder) {}

  ngOnInit(): void {
    this.generateForumForm();
  }

  generateForumForm(){
    this.forumForm = this.formBuilder.group({
      accountId: [this.authService.accountValue.accountId],
      title: [null, [Validators.required]],
      body: [null],
    });
  }

  public addForum(): void{
    if(this.forumForm.valid){
      const formData = new FormData();
      const forum = this.forumForm.value;

      formData.append('image',this.thumbnail);
      formData.append('forum',new Blob([JSON.stringify(forum)], {type:"application/json"}));

      this.loading = true;

      this.forumService.addForum(formData).subscribe({
        next: (response: any) => {
          console.log(response);
          this.loading = false;
          this.isForumFormSubmitted = true;
          this.openResultDialog(this.isForumFormSubmitted,"Thread has been created","./forum");
        },
        error: (error: any) => {
          console.log(error);
          this.loading = false;
          this.isForumFormSubmitted = false;
          this.openResultDialog(this.isForumFormSubmitted,"There was a problem",null);
        }
      });
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

  openResultDialog(success:boolean,description:string,link:string){
    const dialogRef = this.dialog.open(ResultDialogComponent,{
      data:{
        success:success,
        description:description,
        link:link
      }
    });
  }
}
