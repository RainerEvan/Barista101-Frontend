import { DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';
import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BrewService } from 'src/app/main/services/brew/brew.service';

@Component({
  selector: 'app-add-brew',
  templateUrl: './add-brew.component.html',
  styleUrls: ['./add-brew.component.css']
})
export class AddBrewComponent implements OnInit {

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
    this.generateBrewForm();
    this.preparations = this.formBuilder.array([this.createPreparation()]);
    this.steps = this.formBuilder.array([this.createStep()]);
  }

  generateBrewForm(){
    this.brewForm = this.formBuilder.group({
      title: [null, [Validators.required]],
      description: [null, [Validators.required]],
      grindSize: [null, [Validators.required]],
      coffee: [null, [Validators.required]],
      water: [null, [Validators.required]],
      ratio: [null, [Validators.required]],
      time: [null, [Validators.required]],
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

  public addBrew(): void{
    if(this.brewForm.valid){
      const formData = new FormData();
      this.brewForm.controls['preparations'].setValue(JSON.stringify(this.preparations.value));
      this.brewForm.controls['steps'].setValue(JSON.stringify(this.steps.value));
      const brew = this.brewForm.value;

      formData.append('image',this.thumbnail);
      formData.append('brew', new Blob([JSON.stringify(brew)], {type:"application/json"}));
      
      this.brewService.addBrew(formData).subscribe({
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

  resetForm(){
    this.brewForm.reset();
    this.preparations.reset();
    this.steps.reset();
    this.thumbnail = null;
  }

  closeDialog(){
    this.dialogRef.close();
  }

}
