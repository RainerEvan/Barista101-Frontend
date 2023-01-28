import { Dialog } from '@angular/cdk/dialog';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Modules } from 'src/app/main/models/modules';
import { ModuleService } from 'src/app/main/services/module/module.service';
import { environment } from 'src/environments/environment';
import { EditModuleComponent } from '../edit-module/edit-module.component';

@Component({
  selector: 'app-module-detail',
  templateUrl: './module-detail.component.html',
  styleUrls: ['./module-detail.component.css']
})
export class ModuleDetailComponent implements OnInit {

  module:Modules;
  loading:boolean = false;

  constructor(public dialog:Dialog, private route:ActivatedRoute,private moduleService:ModuleService) { }

  ngOnInit(): void {
    this.getModule();
  }

  public getModule(){
    const moduleId = this.route.snapshot.paramMap.get('id');

    this.loading = true;
    
    if(moduleId){
      this.moduleService.getModule(moduleId).subscribe({
        next:(response:Modules)=>{
          this.module = response;
          this.loading = false;
        },
        error:(error:any)=>{
            console.log(error);
        }
      });
    }
  }

  openEditDialog(){
    const dialogRef = this.dialog.open(EditModuleComponent, {
      data:{
        title:"Edit Module",
        module:this.module
      }
    });

    dialogRef.closed.subscribe((success) => {
      if(success){
        this.getModule();
      }
    });
  }

}
