import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ForumComments } from 'src/app/main/models/forumcomments';
import { AuthService } from 'src/app/main/services/auth/auth.service';
import { ForumCommentService } from 'src/app/main/services/forum-comment/forum-comment.service';
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
  profileImgUrl=environment.apiUrl+"/account/profile-img/";
  accountId = this.authService.accountValue.accountId;

  constructor(private route:ActivatedRoute, private authService:AuthService,private forumCommentService:ForumCommentService, private formBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.getAllCommentsForForum();
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
