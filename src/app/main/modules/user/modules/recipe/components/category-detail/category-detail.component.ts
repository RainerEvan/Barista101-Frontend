import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecipeCategories } from 'src/app/main/models/recipecategories';
import { Recipes } from 'src/app/main/models/recipes';
import { RecipeCategoryService } from 'src/app/main/services/recipe-category/recipe-category.service';
import { RecipeService } from 'src/app/main/services/recipe/recipe.service';

@Component({
  selector: 'app-category-detail',
  templateUrl: './category-detail.component.html',
  styleUrls: ['./category-detail.component.css']
})
export class CategoryDetailComponent implements OnInit {
  
  recipeCategory:RecipeCategories;
  recipes:Recipes[] = [];
  loading1:boolean = false;
  loading2:boolean = false;

  constructor(private route:ActivatedRoute, private recipeCategoryService:RecipeCategoryService, private recipeService:RecipeService) { }

  ngOnInit(): void {
    this.getRecipeCategory();
    this.getAllRecipesForCategory();
  }

  public getRecipeCategory(){
    const categoryId = this.route.snapshot.paramMap.get('id');

    this.loading1 = true;
    
    this.recipeCategoryService.getRecipeCategory(categoryId).subscribe({
      next:(response:RecipeCategories)=>{
        this.recipeCategory = response;
        this.loading1 = false;
      },
      error:(error:any)=>{
        console.log(error);
      }
    });
  }

  public getAllRecipesForCategory(){
    const categoryId = this.route.snapshot.paramMap.get('id');

    this.loading2 = true;
    
    this.recipeService.getAllRecipesForCategory(categoryId).subscribe({
      next:(response:Recipes[])=>{
        this.recipes = response;
        this.loading2 = false;
      },
      error:(error:any)=>{
        console.log(error);
      }
    });
  }

}
