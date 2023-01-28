import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecipeRatings } from 'src/app/main/models/reciperatings';
import { RecipeRatingService } from 'src/app/main/services/recipe-rating/recipe-rating.service';

@Component({
  selector: 'app-recipe-rating-list',
  templateUrl: './recipe-rating-list.component.html',
  styleUrls: ['./recipe-rating-list.component.css']
})
export class RecipeRatingListComponent implements OnInit {

  isRecipeRatingFormSubmitted:boolean = false;
  recipeRatings:RecipeRatings[] = [];
  loading:boolean = false;

  constructor(private route:ActivatedRoute, private recipeRatingService:RecipeRatingService) { }

  ngOnInit(): void {
    this.getAllRatingsForRecipe();
  }

  public getAllRatingsForRecipe(){
    const recipeId = this.route.snapshot.paramMap.get('id');

    this.loading = true;
    
    if(recipeId){
      this.recipeRatingService.getAllRatingsForRecipe(recipeId).subscribe({
        next:(response:RecipeRatings[])=>{
          this.recipeRatings = response;
          this.loading = false;
        },
        error:(error:any)=>{
          console.log(error);
        }
      });
    }
  }

}
