import { Component, OnInit } from '@angular/core';
import { Forums } from 'src/app/main/models/forums';
import { ForumService } from 'src/app/main/services/forum/forum.service';

@Component({
  selector: 'app-forum-list',
  templateUrl: './forum-list.component.html',
  styleUrls: ['./forum-list.component.css']
})
export class ForumListComponent implements OnInit {

  forums:Forums[] = [];
  loading:boolean = false;

  constructor(private forumService:ForumService) { }

  ngOnInit(): void {
    this.getAllforums();
  }

  public getAllforums(){
    this.loading = true;
    
    this.forumService.getAllForums().subscribe({
      next:(response:Forums[])=>{
        this.forums = response;
        this.loading = false;
      },
      error:(error:any)=>{
          console.log(error);
      }
    });
  }

}
