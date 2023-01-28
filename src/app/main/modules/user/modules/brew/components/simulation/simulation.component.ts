import { Dialog } from '@angular/cdk/dialog';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { CompleteDialogComponent } from 'src/app/main/modules/shared/components/complete-dialog/complete-dialog.component';
import { BrewService } from 'src/app/main/services/brew/brew.service';

@Component({
  selector: 'app-simulation',
  templateUrl: './simulation.component.html',
  styleUrls: ['./simulation.component.css']
})
export class SimulationComponent implements OnInit,OnDestroy {

  steps:any;
  stepCount:number = 0;
  currStep:any;

  timerId:any;
  isRunning:boolean = false;
  totalTime:number = 0;
  seconds:number = 0;

  waterId:any;
  isPouring:boolean = false;
  totalWater:number = 0;
  targetWater:number = 0;
  decigram:number = 0
  pourSpeed:number = 0;

  constructor(public dialog:Dialog, private brewService:BrewService) {}

  ngOnInit(): void {
    this.steps = JSON.parse(this.brewService.brewData.steps);
    this.totalTime = this.brewService.brewData.time;
    this.totalWater = this.brewService.brewData.water;
  }

  ngOnDestroy():void{
    clearInterval(this.timerId);
    clearInterval(this.waterId);
  }

  toggleTimer(){
    if(!this.currStep){
      this.nextStep();
    }

    if (!this.isRunning && this.seconds != this.totalTime) {
      this.timerId = setInterval(() => {
        this.seconds++;

        if(this.currStep.pour){
          if(!this.isPouring && this.decigram != this.targetWater){
            this.toggleWater();
          }
        }

        if(this.seconds == this.currStep.seconds){
          if(this.stepCount != this.steps.length-1){
            this.stepCount++;
            this.nextStep();
          }
          else{
            this.openCompleteDialog();
          }
        }

        if(this.seconds == this.totalTime){
          this.isRunning = !this.isRunning;
          clearInterval(this.timerId);
        }

      }, 1000);

      if(this.isPouring){
        this.isPouring = !this.isPouring;
      }
    } else {
      clearInterval(this.timerId);
      clearInterval(this.waterId);
    }
    this.isRunning = !this.isRunning;
  }

  toggleWater(){
    if(!this.isPouring) {

      this.waterId = setInterval(() => {
        this.decigram++;

        if (this.decigram == this.targetWater){
          clearInterval(this.waterId);
          this.isPouring = !this.isPouring;
        }
      }, this.pourSpeed);
    } else {
      clearInterval(this.waterId);
    }
    this.isPouring = !this.isPouring;
  }

  nextStep(){
    this.currStep = this.steps[this.stepCount];

    const water = Number((this.currStep.water * this.totalWater * 10).toFixed(1));

    this.targetWater += water;
    this.pourSpeed = Math.floor((this.currStep.seconds - this.seconds - 1)*1000 / water);
  }

  formatTime(time: number){
    let minutes = (Math.floor(time / 60)).toString();

    if (minutes.length === 1){
      minutes = '0' + minutes;
    }
  
    let seconds = (time % 60).toString();
    
    if (seconds.length === 1) {
      seconds = '0' + seconds;
    }
  
    return `${minutes}:${seconds}`;
  }

  formatWater(water: number){
    let gram = (water / 10).toFixed(1);

    return gram;
  }

  formatDesc(currStep:any){
    return currStep.desc.replace("{water}", (currStep.water * this.totalWater).toFixed(1));
  }
  
  formatProgress(){
    let rawTimeFraction = this.seconds / (this.totalTime - 1);
    return (rawTimeFraction * 283).toFixed(0);
  }

  openCompleteDialog(){
    this.dialog.open(CompleteDialogComponent,{
      data:{
        icon: 'beaker',
        title:'Brewing Done',
        description: 'Enjoy your cup of coffee',
        link:`./brew/detail/${this.brewService.brewData.id}`
      }
    });
  }

  // Yang sebelumnya
  // isRunning:boolean = false;
  // seconds:number = 0;
  // totalTime:number = 90;
  // timerId:any = 0;
  // waterId:any = 0;
  // steps:any;
  // currStep:string = "Get Ready in 3..2..1..";
  // targetWater:number = 0;
  // gr:number = 0;
  // mg:number = 0

  // constructor() {
  //   this.steps = [
  //     {
  //       desc:"Pour 30 gr of water to bloom and stir gently",
  //       water:30,
  //       seconds:0,
  //       pour:true
  //     },
  //     {
  //       desc:"Wait for the coffee to bloom",
  //       water:0,
  //       seconds:13,
  //       pour:false
  //     },
  //     {
  //       desc:"Pour another 70 gr of water",
  //       water:70,
  //       seconds:30,
  //       pour:true
  //     },
  //     {
  //       desc:"Let all the water drain through",
  //       water:0,
  //       seconds:70,
  //       pour:false
  //     },
  //   ]
  // }

  // ngOnInit(): void {
  //   setTimeout(() => {
  //     // this.toggleTimer();
  //     this.currStep = this.steps[0].desc;
  //     this.targetWater = this.steps[0].water;
  //   },1000);
  // }

  // toggleTimer(){
  //   if (!this.isRunning && this.seconds != this.totalTime) {
  //     this.timerId = setInterval(() => {
  //       this.seconds++;

  //       this.steps.forEach((step) => {
  //         if(this.seconds == step.seconds){
  //           this.currStep = step.desc;
  //           this.targetWater += step.water;
  //           this.toggleWater(step.pour);
  //         }
  //       });

  //       if(this.seconds == this.totalTime){
  //         this.isRunning = !this.isRunning;
  //         clearInterval(this.timerId);
  //       }

  //     }, 1000);

  //     this.toggleWater(!this.isRunning);
  //   } else {
  //     clearInterval(this.timerId);
  //     clearInterval(this.waterId);
  //   }
  //   this.isRunning = !this.isRunning;
  // }

  // toggleWater(isPouring:boolean){
  //   if (isPouring) {
  //     this.waterId = setInterval(() => {
  //       this.mg++;

  //       if (this.mg % 100 == 0) {
  //         this.gr++;
  //         this.mg = 0;
  //       }
  //       if (this.gr == this.targetWater){
  //         isPouring = !isPouring;
  //         clearInterval(this.waterId);
  //       }
  //     }, 0.5);
  //   } else {
  //     clearInterval(this.waterId);
  //   }
  // }

  // // format(num: number) {
  // //   return (num + '').length === 1 ? '0' + num : num + '';
  // // }

  // format(time: number){
  //   let minutes = (Math.floor(time / 60)).toString();

  //   if (minutes.length === 1){
  //     minutes = '0' + minutes;
  //   }
  
  //   let seconds = (time % 60).toString();
    
  //   if (seconds.length === 1) {
  //     seconds = '0' + seconds;
  //   }
  
  //   return `${minutes}:${seconds}`;
  // }
  
  // formatProgress(){
  //   let rawTimeFraction = this.seconds / this.totalTime;
  //   // let progress = rawTimeFraction - (1 / this.totalTime) * (1 - rawTimeFraction);
  //   return (rawTimeFraction * 283).toFixed(0);
  // }
}
