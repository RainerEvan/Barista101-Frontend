import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RecipeRatings } from 'src/app/main/models/reciperatings';
import { AuthService } from 'src/app/main/services/auth/auth.service';
import { NotificationService } from 'src/app/main/services/notification/notification.service';
import { RecipeRatingService } from 'src/app/main/services/recipe-rating/recipe-rating.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-recipe-rating-list',
  templateUrl: './recipe-rating-list.component.html',
  styleUrls: ['./recipe-rating-list.component.css']
})
export class RecipeRatingListComponent implements OnInit {

  @Output() updateRating = new EventEmitter<boolean>();
  recipeRatingForm:FormGroup;
  stars:boolean[] = [];
  isRecipeRatingFormSubmitted:boolean = false;
  isRecipeRated:boolean = false;
  recipeRatings:RecipeRatings[] = [];
  loading:boolean = false;
  profileImgUrl = environment.apiUrl+"/account/profile-img/"
  account = this.authService.accountValue;

  constructor(private route:ActivatedRoute, private authService:AuthService, private recipeRatingService:RecipeRatingService, private notificationService:NotificationService, private formBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.getAllRatingsForRecipe();
    this.generateRecipeRatingForm();
  }

  generateRecipeRatingForm(){
    const recipeId = this.route.snapshot.paramMap.get('id');

    this.stars = Array(5).fill(false);

    this.recipeRatingForm = this.formBuilder.group({
      recipeId: [recipeId],
      accountId: [this.account.accountId],
      rating: [0, [Validators.required]],
      body: [null, [Validators.required]],
    });
  }

  public getAllRatingsForRecipe(){
    const recipeId = this.route.snapshot.paramMap.get('id');

    this.loading = true;
    
    if(recipeId){
      this.recipeRatingService.getAllRatingsForRecipe(recipeId).subscribe({
        next:(response:RecipeRatings[])=>{
          this.recipeRatings = response;
          this.loading = false;
          if(this.recipeRatings.some(rating => this.account.accountId.match(rating.author.id))){
            this.isRecipeRated = true;
          }
        },
        error:(error:any)=>{
          console.log(error);
        }
      });
    }
  }

  public addRecipeRating(){
    const recipeId = this.route.snapshot.paramMap.get('id');

    if(this.recipeRatingForm.valid){
      const formData = this.recipeRatingForm.value;

      const notificationData = {
        link:`../recipe/detail/${recipeId}`,
        icon:2
      }

      this.recipeRatingService.addRecipeRating(formData).subscribe({
        next: (response: any) => {
          console.log(response);
          this.isRecipeRatingFormSubmitted = true;
          this.generateRecipeRatingForm();
          this.updateRating.emit(this.isRecipeRatingFormSubmitted);
          this.getAllRatingsForRecipe();
          if(response.data != this.account.accountId){
            this.notificationService.addNotification(response.data,`<b>${this.account.username}</b> has rated your recipe, check it out`,JSON.stringify(notificationData));
          }
        },
        error: (error: any) => {
          console.log(error);
          this.isRecipeRatingFormSubmitted = false;
        }
      });
    } 
  }

  rate(rating:number){
    this.recipeRatingForm.controls["rating"].setValue(rating);
    this.stars = this.stars.map((_,i) => rating > i);
  }
}
