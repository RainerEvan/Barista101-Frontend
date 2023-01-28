import { DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';
import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RecipeCategoryService } from 'src/app/main/services/recipe-category/recipe-category.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {

  categoryForm:FormGroup;
  isCategoryFormSubmitted:boolean = false;

  constructor(public dialogRef:DialogRef, @Inject(DIALOG_DATA) public data:any, private recipeCategoryService:RecipeCategoryService, private formBuilder:FormBuilder) {}

  ngOnInit(): void {
    this.generateCategoryForm();
  }

  generateCategoryForm(){
    this.categoryForm = this.formBuilder.group({
      name: [null, [Validators.required]],
    });
  }

  public addCategory(): void{
    if(this.categoryForm.valid){
      const formData = this.categoryForm.controls['name'].value;

      this.recipeCategoryService.addRecipeCategory(formData).subscribe({
        next: (result: any) => {
          console.log(result);
          this.isCategoryFormSubmitted = true;
          this.dialogRef.close(this.isCategoryFormSubmitted);
        },
        error: (error: any) => {
          console.log(error);
          this.isCategoryFormSubmitted = false;
          this.dialogRef.close(this.isCategoryFormSubmitted);
        }
      });
    } 
  }

  closeDialog(){
    this.dialogRef.close();
  }

}
