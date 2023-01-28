import { Dialog } from '@angular/cdk/dialog';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Modules } from 'src/app/main/models/modules';
import { ConfirmationDialogComponent } from 'src/app/main/modules/shared/components/confirmation-dialog/confirmation-dialog.component';
import { ModuleService } from 'src/app/main/services/module/module.service';
import { environment } from 'src/environments/environment';
import { AddModuleComponent } from '../add-module/add-module.component';

@Component({
  selector: 'app-module-list',
  templateUrl: './module-list.component.html',
  styleUrls: ['./module-list.component.css']
})
export class ModuleListComponent implements OnInit {

  modules:Modules[] = [];
  loading:boolean = false;
  thumbnailUrl=environment.apiUrl+"/module/thumbnail/";

  constructor(public dialog:Dialog, private route:ActivatedRoute, private moduleService:ModuleService) { }

  ngOnInit(): void {
    this.getAllModulesForCourse();
  }

  public getAllModulesForCourse(){
    const courseId = this.route.snapshot.paramMap.get('id');

    this.loading = true;
    
    if(courseId){
      this.moduleService.getAllModulesForCourse(courseId).subscribe({
        next:(response:Modules[])=>{
          this.modules = response;
          this.loading = false;
        },
        error:(error:any)=>{
            console.log(error);
        }
      });
    }
  }

  openAddDialog(){
    const courseId = this.route.snapshot.paramMap.get('id');

    const dialogRef = this.dialog.open(AddModuleComponent, {
      data:{
        title:"Add Module",
        courseId:courseId
      }
    });

    dialogRef.closed.subscribe((success) => {
      if(success){
        this.getAllModulesForCourse();
      }
    });
  }

  openDeleteDialog(moduleId:string){
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data:{
        title:"Delete Module",
        description:"Are you sure you want to delete this module?"
      }
    });

    dialogRef.closed.subscribe((confirm) => {
      if(confirm){
        this.deleteModule(moduleId);
      }
    });
  }

  deleteModule(moduleId:string){
    this.moduleService.deleteModule(moduleId).subscribe({
      next:(response:any)=>{
        this.getAllModulesForCourse();
        console.log(response);
      },
      error:(error:any)=>{
        console.log(error);
      }
    });
  }
}
