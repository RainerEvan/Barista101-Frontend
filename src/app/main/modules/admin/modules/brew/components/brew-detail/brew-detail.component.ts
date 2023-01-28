import { Dialog } from '@angular/cdk/dialog';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Brews } from 'src/app/main/models/brews';
import { BrewService } from 'src/app/main/services/brew/brew.service';
import { EditBrewComponent } from '../edit-brew/edit-brew.component';

@Component({
  selector: 'app-brew-detail',
  templateUrl: './brew-detail.component.html',
  styleUrls: ['./brew-detail.component.css']
})
export class BrewDetailComponent implements OnInit {

  brew:Brews;
  preparations:any;
  steps:any;
  loading:boolean = false;

  constructor(public dialog:Dialog, private route:ActivatedRoute,private brewService:BrewService) { }

  ngOnInit(): void {
    this.getBrew();
  }

  public getBrew(){
    const brewId = this.route.snapshot.paramMap.get('id');

    this.loading = true;
    
    if(brewId){
      this.brewService.getBrew(brewId).subscribe({
        next:(response:Brews)=>{
          this.brew = response;
          this.preparations = JSON.parse(this.brew.preparations);
          this.steps = JSON.parse(this.brew.steps);
          this.loading = false;
        },
        error:(error:any)=>{
            console.log(error);
        }
      });
    }
  }

  openEditDialog(){
    const dialogRef = this.dialog.open(EditBrewComponent, {
      data:{
        title:"Edit Brew",
        brew:this.brew
      }
    });

    dialogRef.closed.subscribe((success) => {
      if(success){
        this.getBrew();
      }
    });
  }

}
