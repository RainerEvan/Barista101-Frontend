import { Dialog } from '@angular/cdk/dialog';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ForumComments } from 'src/app/main/models/forumcomments';
import { ConfirmationDialogComponent } from 'src/app/main/modules/shared/components/confirmation-dialog/confirmation-dialog.component';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-comment-detail',
  templateUrl: './comment-detail.component.html',
  styleUrls: ['./comment-detail.component.css'],
  host:{
    "(window:click)":"onClick()"
  }
})
export class CommentDetailComponent implements OnInit {

  @Input("comment") comment:ForumComments;
  @Output() commentId = new EventEmitter<string>();
  profileImgUrl=environment.apiUrl+"/account/profile-img/";
  showDropdown:boolean = false;

  constructor(public dialog:Dialog) { }

  ngOnInit(): void {
  }

  openDeleteDialog(){
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data:{
        title:"Delete Comment",
        description:"Are you sure you want to delete this comment?"
      }
    });

    dialogRef.closed.subscribe((confirm) => {
      if(confirm){
        this.commentId.emit(this.comment.id);
      }
    });
  }

  toggleDropdown(event:any){
    event.stopPropagation();
    this.showDropdown = !this.showDropdown;
  }

  onClick(){
    this.showDropdown = false;
  }

}
