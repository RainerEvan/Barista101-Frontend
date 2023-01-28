import { Component, OnInit } from '@angular/core';
import { BrewService } from 'src/app/main/services/brew/brew.service';

@Component({
  selector: 'app-steps',
  templateUrl: './steps.component.html',
  styleUrls: ['./steps.component.css']
})
export class StepsComponent implements OnInit {

  brewData:any;
  steps:any;
  totalWater:number = 0;

  constructor(private brewService:BrewService) {}

  ngOnInit(): void {
    this.brewData = this.brewService.brewData;
    this.totalWater = this.brewData.water;
    this.steps = JSON.parse(this.brewData.steps);
  }

  formatDesc(step:any){
    return step.desc.replace("{water}", (step.water * this.totalWater).toFixed(1));
  }

}
