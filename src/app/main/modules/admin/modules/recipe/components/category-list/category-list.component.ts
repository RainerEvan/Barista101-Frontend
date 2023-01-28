import { Dialog } from '@angular/cdk/dialog';
import { Component, OnInit } from '@angular/core';
import { RecipeCategories } from 'src/app/main/models/recipecategories';
import { ConfirmationDialogComponent } from 'src/app/main/modules/shared/components/confirmation-dialog/confirmation-dialog.component';
import { RecipeCategoryService } from 'src/app/main/services/recipe-category/recipe-category.service';
import { AddCategoryComponent } from '../add-category/add-category.component';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {

  recipeCategories:RecipeCategories[] = [];
  loading:boolean = false;

  constructor(public dialog:Dialog, private recipeCategoryService:RecipeCategoryService) { }

  ngOnInit(): void {
    this.getAllRecipeCategories();
  }

  public getAllRecipeCategories(){
    this.loading = true;
    
    this.recipeCategoryService.getAllRecipeCategories().subscribe({
      next:(response:RecipeCategories[])=>{
        this.recipeCategories = response;
        this.loading = false;
      },
      error:(error:any)=>{
        console.log(error);
      }
    });
  }

  openAddDialog(){
    const dialogRef = this.dialog.open(AddCategoryComponent, {
      data:{
        title:"Add Category",
      }
    });

    dialogRef.closed.subscribe((success) => {
      if(success){
        this.getAllRecipeCategories();
      }
    });
  }

  openDeleteDialog(categoryId:string){
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data:{
        title:"Delete Category",
        description:"Are you sure you want to delete this category?"
      }
    });

    dialogRef.closed.subscribe((confirm) => {
      if(confirm){
        this.deleteCategory(categoryId);
      }
    });
  }

  deleteCategory(categoryId:string){
    this.recipeCategoryService.deleteRecipeCategory(categoryId).subscribe({
      next:(response:any)=>{
        this.getAllRecipeCategories();
        console.log(response);
      },
      error:(error:any)=>{
        console.log(error);
      }
    });
  }
}
