import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BrewService } from 'src/app/main/services/brew/brew.service';

@Component({
  selector: 'app-preparations',
  templateUrl: './preparations.component.html',
  styleUrls: ['./preparations.component.css']
})
export class PreparationsComponent implements OnInit {

  brewData:any;
  preparations:any
  loading:boolean = false;

  constructor(private router:Router, private brewService:BrewService) { }

  ngOnInit(): void {
    this.brewData = this.brewService.brewData;
    this.preparations = JSON.parse(this.brewData.preparations);
  }

  toggleCheck(preparation:any){
    preparation.status = !preparation.status;
  }

  updatePreparations(){
    this.loading = true;

    setTimeout(() => {
      this.brewData.preparations = JSON.stringify(this.preparations);

      this.brewService.updateBrewData(this.brewData);
      this.loading = false;
      this.router.navigate(['./brew/detail/',this.brewData.id]);
    },1000);
  }
}
