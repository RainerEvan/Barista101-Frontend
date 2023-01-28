import { Dialog } from '@angular/cdk/dialog';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Forums } from 'src/app/main/models/forums';
import { ConfirmationDialogComponent } from 'src/app/main/modules/shared/components/confirmation-dialog/confirmation-dialog.component';
import { ForumService } from 'src/app/main/services/forum/forum.service';

@Component({
  selector: 'app-forum-detail',
  templateUrl: './forum-detail.component.html',
  styleUrls: ['./forum-detail.component.css'],
  host:{
    "(window:click)":"onClick()"
  }
})
export class ForumDetailComponent implements OnInit {

  forum:Forums;
  loading:boolean = false;
  showDropdown:boolean = false;

  constructor(public dialog:Dialog, private router:Router, private route:ActivatedRoute, private forumService:ForumService) { }

  ngOnInit(): void {
    this.getForum();
  }

  public getForum(){
    const forumId = this.route.snapshot.paramMap.get('id');

    this.loading = true;
    
    if(forumId){
      this.forumService.getForum(forumId).subscribe({
        next:(response:Forums)=>{
          this.forum = response;
          this.loading = false;
        },
        error:(error:any)=>{
            console.log(error);
        }
      });
    }
  }

  deleteForum(){
    const forumId = this.route.snapshot.paramMap.get('id');

    this.forumService.deleteForum(forumId).subscribe({
      next:(response:any)=>{
        console.log(response);
        this.router.navigate(["./admin/forum"]);
      },
      error:(error:any)=>{
        console.log(error);
      }
    });
  }

  openDeleteDialog(){
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data:{
        title:"Delete Forum",
        description:"Are you sure you want to delete this forum?"
      }
    });

    dialogRef.closed.subscribe((confirm) => {
      if(confirm){
        this.deleteForum();
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
