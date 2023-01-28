import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Brews } from 'src/app/main/models/brews';
import { BrewService } from 'src/app/main/services/brew/brew.service';

@Component({
  selector: 'app-brew-detail',
  templateUrl: './brew-detail.component.html',
  styleUrls: ['./brew-detail.component.css']
})
export class BrewDetailComponent implements OnInit {

  brew:Brews;
  brewData:any;
  loading:boolean = false;

  constructor(private route:ActivatedRoute, private brewService:BrewService) { }

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
          this.brewData = this.brewService.brewData;
          this.loading = false;
        },
        error:(error:any)=>{
            console.log(error);
        }
      });
    }
  }

}
