import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BrewService } from 'src/app/main/services/brew/brew.service';

@Component({
  selector: 'app-edit-dose',
  templateUrl: './edit-dose.component.html',
  styleUrls: ['./edit-dose.component.css']
})
export class EditDoseComponent implements OnInit {

  brewData:any;
  doseForm:FormGroup;
  loading:boolean = false;
  isDoseFormSubmitted:boolean = false;
  cups:number = 1;
  coffeeVal:number = 0;
  waterVal:number = 0;
  ratios:any;
  grindSizes:any;

  constructor(private route:ActivatedRoute, private router:Router, private brewService:BrewService, private formBuilder:FormBuilder) {
    this.ratios = Array.from({length:30}, (v,k)=>k+1);

    this.grindSizes = [
      {
        name:"Coarse",
        description:"French Press, Cold Brew",
        value:"coarse"
      },
      {
        name:"Medium",
        description:"Pour Over, Machine Drip, Siphon, Aero Press",
        value:"medium"
      },
      {
        name:"Fine",
        description:"Moka Pot, Espresso",
        value:"fine"
      },
    ]
  }

  ngOnInit(): void {
    this.brewData = this.brewService.brewData;
    this.coffeeVal = this.brewData.coffee;
    this.waterVal = this.brewData.water;
    this.generateDoseForm();
  }

  generateDoseForm(){
    this.doseForm = this.formBuilder.group({
      coffee: [this.brewData.coffee, [Validators.required, Validators.min(1)]],
      water: [this.brewData.water, [Validators.required, Validators.min(1)]],
      ratio: [this.brewData.ratio, [Validators.required, Validators.min(1)]],
      grindSize: [this.brewData.grindSize, [Validators.required]],
    });
  }

  get coffee(){
    return this.doseForm.get('coffee');
  }
  get water(){
    return this.doseForm.get('water');
  }
  get ratio(){
    return this.doseForm.get('ratio');
  }

  increment(){
    if(this.cups + 1 <= 5){
      this.cups += 1;
      this.coffee.setValue(this.coffee.value + this.coffeeVal);
      this.water.setValue(this.water.value + this.waterVal);
    }
  }

  decrement(){
    if(this.cups - 1 > 0){
      this.coffee.setValue(this.coffee.value - this.coffeeVal);
      this.water.setValue(this.water.value - this.waterVal);
      this.cups -= 1;
    }
  }

  onChangeCoffee(event:any){
    const coffee = event.target.value;

    if(coffee > 0){
      this.coffeeVal = coffee * 1;
      this.waterVal = coffee * this.ratio.value;
      this.water.setValue(this.waterVal);
    }
  }

  onChangeWater(event:any){
    const water = event.target.value;

    if(water > 0){
      this.waterVal = water * 1;
      this.ratio.setValue(Math.floor(water / this.coffee.value));
    }
  }

  onChangeRatio(event:any){
    const ratio = event.target.value;

    if(ratio > 0){
      this.waterVal = this.ratio.value * this.coffee.value
      this.water.setValue(this.waterVal);
    }
  }

  editDose(){
    this.loading = true;

    setTimeout(() => {
      if(this.doseForm.valid){
        const formData = this.doseForm.value;
  
        this.brewData.coffee = formData.coffee;
        this.brewData.water = formData.water;
        this.brewData.ratio = formData.ratio;
        this.brewData.grindSize = formData.grindSize;
  
        this.brewService.updateBrewData(this.brewData);
        this.loading = false;
        this.router.navigate(['./brew/detail/',this.brewData.id]);
      }
    },1000);
  }
}
