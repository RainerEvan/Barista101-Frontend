import { Component, OnInit } from '@angular/core';
import { Forums } from 'src/app/main/models/forums';
import { AuthService } from 'src/app/main/services/auth/auth.service';
import { ForumService } from 'src/app/main/services/forum/forum.service';

@Component({
  selector: 'app-my-forum',
  templateUrl: './my-forum.component.html',
  styleUrls: ['./my-forum.component.css']
})
export class MyForumComponent implements OnInit {

  forums:Forums[] = [];
  loading:boolean = false;

  constructor(private authService:AuthService, private forumService:ForumService) { }

  ngOnInit(): void {
    this.getAllforums();
  }

  public getAllforums(){
    const accountId = this.authService.accountValue.accountId;

    this.loading = true;
    
    this.forumService.getAllForumsForAccount(accountId).subscribe({
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
