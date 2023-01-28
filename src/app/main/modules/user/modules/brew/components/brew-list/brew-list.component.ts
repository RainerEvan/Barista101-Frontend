import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Brews } from 'src/app/main/models/brews';
import { BrewService } from 'src/app/main/services/brew/brew.service';

@Component({
  selector: 'app-brew-list',
  templateUrl: './brew-list.component.html',
  styleUrls: ['./brew-list.component.css']
})
export class BrewListComponent implements OnInit {

  brews:Brews[] = [];
  loading:boolean = false;

  constructor(private route:ActivatedRoute, private router:Router, private brewService:BrewService) { }

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

  selectBrew(brew:Brews){
    this.brewService.updateBrewData(brew);
    this.router.navigate(['./detail',brew.id],{relativeTo:this.route});
  }

}
