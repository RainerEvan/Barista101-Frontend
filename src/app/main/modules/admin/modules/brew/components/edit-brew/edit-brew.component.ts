import { DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';
import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Brews } from 'src/app/main/models/brews';
import { BrewService } from 'src/app/main/services/brew/brew.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-edit-brew',
  templateUrl: './edit-brew.component.html',
  styleUrls: ['./edit-brew.component.css']
})
export class EditBrewComponent implements OnInit {

  brew:Brews;
  brewForm:FormGroup;
  preparations:FormArray;
  steps:FormArray;
  grindSizes:any;
  isBrewFormSubmitted:boolean = false;
  thumbnail:any;
  imageUrl:any;

  constructor(public dialogRef:DialogRef, @Inject(DIALOG_DATA) public data:any, private brewService:BrewService, private formBuilder:FormBuilder) {
    this.grindSizes = [
      {
        name:"Coarse",
        value:"coarse"
      },
      {
        name:"Medium",
        value:"medium"
      },
      {
        name:"Fine",
        value:"fine"
      },
    ]
  }

  ngOnInit(): void {
    this.brew = this.data.brew;
    this.generateBrewForm();
    this.imageUrl = environment.apiUrl+"/brew/thumbnail/"+this.brew.id;
    this.preparations = this.formBuilder.array([]);
    this.steps = this.formBuilder.array([]);
    this.getPreparations();
    this.getSteps();
  }

  getPreparations(){
    const preparations = JSON.parse(this.brew.preparations);

    preparations.forEach((preparation:any) => {
      const fb = this.formBuilder.group({
        item: [preparation.item, [Validators.required]],
        status: [preparation.status, [Validators.required]]
      });

      this.preparations.push(fb);
    });
  }

  getSteps(){
    const steps = JSON.parse(this.brew.steps);

    steps.forEach((step:any) => {
      const fb = this.formBuilder.group({
        desc: [step.desc, [Validators.required]],
        water: [step.water, [Validators.required]],
        seconds: [step.seconds, [Validators.required]],
        pour: [step.pour, [Validators.required]]
      });

      this.steps.push(fb);
    });
  }

  generateBrewForm(){
    this.brewForm = this.formBuilder.group({
      title: [this.brew.title, [Validators.required]],
      description: [this.brew.description, [Validators.required]],
      grindSize: [this.brew.grindSize, [Validators.required]],
      coffee: [this.brew.coffee, [Validators.required]],
      water: [this.brew.water, [Validators.required]],
      ratio: [this.brew.ratio, [Validators.required]],
      time: [this.brew.time, [Validators.required]],
      preparations: [null],
      steps: [null],
    });
  }

  createPreparation(){
    return this.formBuilder.group({
      item: ['', [Validators.required]],
      status: [false, [Validators.required]]
    });
  }
  addPreparation(){
    this.preparations.push(this.createPreparation());
  }
  deletePreparation(index:number){
    this.preparations.removeAt(index);
  }

  createStep(){
    return this.formBuilder.group({
      desc: ['', [Validators.required]],
      water: [null, [Validators.required]],
      seconds: [null, [Validators.required]],
      pour: [false, [Validators.required]]
    });
  }
  addStep(){
    this.steps.push(this.createStep());
  }
  deleteStep(index:number){
    this.steps.removeAt(index);
  }

  public editBrew(): void{
    if(this.brewForm.valid){
      const formData = new FormData();
      this.brewForm.controls['preparations'].setValue(JSON.stringify(this.preparations.value));
      this.brewForm.controls['steps'].setValue(JSON.stringify(this.steps.value));
      const brew = this.brewForm.value;

      formData.append('image',this.thumbnail);
      formData.append('brewId', new Blob([JSON.stringify(this.brew.id)], {type:"application/json"}));
      formData.append('brew', new Blob([JSON.stringify(brew)], {type:"application/json"}));
      
      this.brewService.editBrew(formData).subscribe({
        next: (result: any) => {
          console.log(result);
          this.isBrewFormSubmitted = true;
          this.dialogRef.close(this.isBrewFormSubmitted);
        },
        error: (error: any) => {
          console.log(error);
          this.isBrewFormSubmitted = false;
          this.dialogRef.close(this.isBrewFormSubmitted);
        }
      });
    } 
  }

  @HostListener("dragover", ["$event"]) onDragOver(event: any) {
    event.preventDefault();
  }
  @HostListener("dragleave", ["$event"]) onDragLeave(event: any) {
    event.preventDefault();
  }
  @HostListener("drop", ["$event"]) onDrop(event: any) {
    event.preventDefault();
    event.stopPropagation();
    if (event.dataTransfer.files) {
      this.thumbnail = event.dataTransfer.files[0];
      this.previewImage(this.thumbnail);
    }
  }

  onSelectFile(event:any){
    if(event.target.files.length > 0){
      this.thumbnail = event.target.files[0];
      this.previewImage(this.thumbnail);
    }
  }

  previewImage(image:any){
    var reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onload = (_event) => {
      this.imageUrl = reader.result;
    }
  }

  closeDialog(){
    this.dialogRef.close();
  }

}
