import { Component, Input, OnInit } from '@angular/core';
import { Recipes } from 'src/app/main/models/recipes';
import { RecipeService } from 'src/app/main/services/recipe/recipe.service';

@Component({
  selector: 'app-recipe-carousel',
  templateUrl: './recipe-carousel.component.html',
  styleUrls: ['./recipe-carousel.component.css']
})
export class RecipeCarouselComponent implements OnInit {

  @Input("categoryId") categoryId:string = "";
  recipes:Recipes[] = [];
  loading:boolean = false;

  constructor(private recipeService:RecipeService) { }

  ngOnInit(): void {
    this.getAllRecipesForCategory();
  }

  public getAllRecipesForCategory(){
    this.loading = true;
    
    this.recipeService.getAllRecipesForCategory(this.categoryId).subscribe({
      next:(response:Recipes[])=>{
        this.recipes = response;
        this.loading = false;
      },
      error:(error:any)=>{
        console.log(error);
      }
    });
  }

}
