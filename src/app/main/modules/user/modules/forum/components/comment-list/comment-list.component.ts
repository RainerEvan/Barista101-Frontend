import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ForumComments } from 'src/app/main/models/forumcomments';
import { AuthService } from 'src/app/main/services/auth/auth.service';
import { ForumCommentService } from 'src/app/main/services/forum-comment/forum-comment.service';
import { NotificationService } from 'src/app/main/services/notification/notification.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.css']
})
export class CommentListComponent implements OnInit {

  forumCommentForm:FormGroup;
  isForumCommentFormSubmitted:boolean = false;
  comments:ForumComments[] = [];
  loading:boolean = false;
  profileImgUrl = environment.apiUrl+"/account/profile-img/"
  account = this.authService.accountValue;

  constructor(private route:ActivatedRoute, private authService:AuthService,private forumCommentService:ForumCommentService, private notificationService:NotificationService, private formBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.getAllCommentsForForum();
    this.generateForumCommentForm();
  }

  generateForumCommentForm(){
    const forumId = this.route.snapshot.paramMap.get('id');

    this.forumCommentForm = this.formBuilder.group({
      forumId: [forumId],
      accountId: [this.account.accountId],
      body: [null, [Validators.required]],
    });
  }

  public getAllCommentsForForum(){
    const forumId = this.route.snapshot.paramMap.get('id');

    this.loading = true;
    
    if(forumId){
      this.forumCommentService.getAllCommentsForForum(forumId).subscribe({
        next:(response:ForumComments[])=>{
          this.comments = response;
          this.loading = false;
        },
        error:(error:any)=>{
            console.log(error);
        }
      });
    }
  }

  public addForumComment(){
    const forumId = this.route.snapshot.paramMap.get('id');

    if(this.forumCommentForm.valid){
      const formData = this.forumCommentForm.value;

      const notificationData = {
        link:`../forum/detail/${forumId}`,
        icon:1
      }

      this.forumCommentService.addForumComment(formData).subscribe({
        next: (response: any) => {
          console.log(response);
          this.isForumCommentFormSubmitted = true;
          this.generateForumCommentForm();
          this.getAllCommentsForForum();
          if(response.data != this.account.accountId){
            this.notificationService.addNotification(response.data,`<b>${this.account.username}</b> has replied to your thread, check it out`,JSON.stringify(notificationData));
          }
        },
        error: (error: any) => {
          console.log(error);
          this.isForumCommentFormSubmitted = false;
        }
      });
    } 
  }

  deleteForumComment(forumCommentId:string){
    this.forumCommentService.deleteForumComment(forumCommentId).subscribe({
      next:(response:any)=>{
        console.log(response);
        this.getAllCommentsForForum();
      },
      error:(error:any)=>{
        console.log(error);
      }
    });
  }

}
