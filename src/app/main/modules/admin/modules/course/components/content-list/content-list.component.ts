import { Dialog } from '@angular/cdk/dialog';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Contents } from 'src/app/main/models/contents';
import { ConfirmationDialogComponent } from 'src/app/main/modules/shared/components/confirmation-dialog/confirmation-dialog.component';
import { ContentService } from 'src/app/main/services/content/content.service';
import { environment } from 'src/environments/environment';
import { AddContentComponent } from '../add-content/add-content.component';

@Component({
  selector: 'app-content-list',
  templateUrl: './content-list.component.html',
  styleUrls: ['./content-list.component.css']
})
export class ContentListComponent implements OnInit {

  contents:Contents[] = [];
  loading:boolean = false;

  constructor(public dialog:Dialog, private route:ActivatedRoute, private contentService:ContentService) { }

  ngOnInit(): void {
    this.getAllContentsForModule();
  }

  public getAllContentsForModule(){
    const moduleId = this.route.snapshot.paramMap.get('id');

    this.loading = true;
    
    if(moduleId){
      this.contentService.getAllContentsForModule(moduleId).subscribe({
        next:(response:Contents[])=>{
          this.contents = response;
          this.loading = false;
        },
        error:(error:any)=>{
            console.log(error);
        }
      });
    }
  }

  openAddDialog(){
    const moduleId = this.route.snapshot.paramMap.get('id');

    const dialogRef = this.dialog.open(AddContentComponent, {
      data:{
        title:"Add Content",
        moduleId:moduleId
      }
    });

    dialogRef.closed.subscribe((success) => {
      if(success){
        this.getAllContentsForModule();
      }
    });
  }

  openDeleteDialog(contentId:string){
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data:{
        title:"Delete Content",
        description:"Are you sure you want to delete this content?"
      }
    });

    dialogRef.closed.subscribe((confirm) => {
      if(confirm){
        this.deleteContent(contentId);
      }
    });
  }

  deleteContent(contentId:string){
    this.contentService.deleteContent(contentId).subscribe({
      next:(response:any)=>{
        this.getAllContentsForModule();
        console.log(response);
      },
      error:(error:any)=>{
        console.log(error);
      }
    });
  }

}
