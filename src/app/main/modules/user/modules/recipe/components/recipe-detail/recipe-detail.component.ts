import { Dialog } from '@angular/cdk/dialog';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Recipes } from 'src/app/main/models/recipes';
import { ConfirmationDialogComponent } from 'src/app/main/modules/shared/components/confirmation-dialog/confirmation-dialog.component';
import { AuthService } from 'src/app/main/services/auth/auth.service';
import { RecipeService } from 'src/app/main/services/recipe/recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css'],
  host:{
    "(window:click)":"onClick()"
  }
})
export class RecipeDetailComponent implements OnInit {

  recipe:Recipes;
  equipments:string[];
  ingredients:string[];
  instructions:string[];
  loading:boolean = false;
  showDropdown:boolean = false;
  accountId = this.authService.accountValue.accountId;

  constructor(public dialog:Dialog, private router:Router, private route:ActivatedRoute, private authService:AuthService, private recipeService:RecipeService) { }

  ngOnInit(): void {
    this.getRecipe();
  }

  public getRecipe(){
    const recipeId = this.route.snapshot.paramMap.get('id');

    this.loading = true;
    
    if(recipeId){
      this.recipeService.getRecipe(recipeId).subscribe({
        next:(response:Recipes)=>{
          this.recipe = response;
          this.equipments = JSON.parse(response.equipments);
          this.ingredients = JSON.parse(response.ingredients);
          this.instructions = JSON.parse(response.instructions);
          this.loading = false;
        },
        error:(error:any)=>{
          console.log(error);
        }
      });
    }
  }

  deleteRecipe(){
    const recipeId = this.route.snapshot.paramMap.get('id');

    this.recipeService.deleteRecipe(recipeId).subscribe({
      next:(response:any)=>{
        console.log(response);
        this.router.navigate(["./recipe"]);
      },
      error:(error:any)=>{
        console.log(error);
      }
    });
  }

  openDeleteDialog(){
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data:{
        title:"Delete recipe",
        description:"Are you sure you want to delete this recipe?"
      }
    });

    dialogRef.closed.subscribe((confirm) => {
      if(confirm){
        this.deleteRecipe();
      }
    });
  }

  toggleDropdown(event:any){
    event.stopPropagation();
    this.showDropdown = !this.showDropdown;
  }

  onClick(){
    this.showDropdown = false;
  }
}
