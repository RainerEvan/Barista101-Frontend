import { Component, OnInit } from '@angular/core';
import { Recipes } from 'src/app/main/models/recipes';
import { AuthService } from 'src/app/main/services/auth/auth.service';
import { RecipeService } from 'src/app/main/services/recipe/recipe.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-my-recipe',
  templateUrl: './my-recipe.component.html',
  styleUrls: ['./my-recipe.component.css']
})
export class MyRecipeComponent implements OnInit {

  recipes:Recipes[] = [];
  loading:boolean = false;
  thumbnailUrl=environment.apiUrl+"/recipe/thumbnail/";

  constructor(private authService:AuthService, private recipeService:RecipeService) { }

  ngOnInit(): void {
    this.getAllRecipes();
  }

  public getAllRecipes(){
    const accountId = this.authService.accountValue.accountId;

    this.loading = true;
    
    this.recipeService.getAllRecipesForAccount(accountId).subscribe({
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
