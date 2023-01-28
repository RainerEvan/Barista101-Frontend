import { Component, OnInit } from '@angular/core';
import { RecipeCategories } from 'src/app/main/models/recipecategories';
import { RecipeCategoryService } from 'src/app/main/services/recipe-category/recipe-category.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {

  recipeCategories:RecipeCategories[] = [];
  loading:boolean = false;

  constructor(private recipeCategoryService:RecipeCategoryService) { }

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

}
