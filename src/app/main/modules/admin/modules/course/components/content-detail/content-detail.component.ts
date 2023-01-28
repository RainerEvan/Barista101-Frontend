import { Dialog } from '@angular/cdk/dialog';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Contents } from 'src/app/main/models/contents';
import { ContentService } from 'src/app/main/services/content/content.service';
import { environment } from 'src/environments/environment';
import { EditContentComponent } from '../edit-content/edit-content.component';

@Component({
  selector: 'app-content-detail',
  templateUrl: './content-detail.component.html',
  styleUrls: ['./content-detail.component.css']
})
export class ContentDetailComponent implements OnInit {

  content:Contents;
  loading:boolean = false;

  constructor(public dialog:Dialog, private route:ActivatedRoute,private contentService:ContentService) { }

  ngOnInit(): void {
    this.getContent();
  }

  public getContent(){
    const contentId = this.route.snapshot.paramMap.get('id');

    this.loading = true;
    
    if(contentId){
      this.contentService.getContent(contentId).subscribe({
        next:(response:Contents)=>{
          this.content = response;
          this.loading = false;
        },
        error:(error:any)=>{
            console.log(error);
        }
      });
    }
  }

  openEditDialog(){
    const dialogRef = this.dialog.open(EditContentComponent, {
      data:{
        title:"Edit Content",
        content:this.content
      }
    });

    dialogRef.closed.subscribe((success) => {
      if(success){
        this.getContent();
      }
    });
  }
}
