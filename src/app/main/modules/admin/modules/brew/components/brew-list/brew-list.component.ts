import { Dialog } from '@angular/cdk/dialog';
import { Component, OnInit } from '@angular/core';
import { Brews } from 'src/app/main/models/brews';
import { ConfirmationDialogComponent } from 'src/app/main/modules/shared/components/confirmation-dialog/confirmation-dialog.component';
import { BrewService } from 'src/app/main/services/brew/brew.service';
import { AddBrewComponent } from '../add-brew/add-brew.component';

@Component({
  selector: 'app-brew-list',
  templateUrl: './brew-list.component.html',
  styleUrls: ['./brew-list.component.css']
})
export class BrewListComponent implements OnInit {

  brews:Brews[] = [];
  loading:boolean = false;

  constructor(public dialog:Dialog, private brewService:BrewService) { }

  ngOnInit(): void {
    this.getAllBrews();
  }

  public getAllBrews(){
    this.loading = true;
    
    this.brewService.getAllBrews().subscribe({
      next:(response:Brews[])=>{
        this.brews = response;
        this.loading = false;
      },
      error:(error:any)=>{
        console.log(error);
      }
    });
  }

  openAddDialog(){
    const dialogRef = this.dialog.open(AddBrewComponent, {
      data:{
        title:"Add Brew",
      }
    });

    dialogRef.closed.subscribe((success) => {
      if(success){
        this.getAllBrews();
      }
    });
  }

  openDeleteDialog(brewId:string){
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data:{
        title:"Delete Brew",
        description:"Are you sure you want to delete this brew?"
      }
    });

    dialogRef.closed.subscribe((confirm) => {
      if(confirm){
        this.deleteBrew(brewId);
      }
    });
  }

  deleteBrew(brewId:string){
    this.brewService.deleteBrew(brewId).subscribe({
      next:(response:any)=>{
        this.getAllBrews();
        console.log(response);
      },
      error:(error:any)=>{
        console.log(error);
      }
    });
  }

}
