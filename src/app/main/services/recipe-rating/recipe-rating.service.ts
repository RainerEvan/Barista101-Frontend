import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RecipeRatings } from '../../models/reciperatings';

const API_URL = environment.apiUrl + "/recipe-rating";

@Injectable({
  providedIn: 'root'
})
export class RecipeRatingService {

  constructor(private http: HttpClient, private apollo: Apollo) { }

  public getAllRatingsForRecipe(recipeId: string): Observable<RecipeRatings[]>{
    return this.apollo.watchQuery<any>({
      query: gql`
        query getAllRatingsForRecipe($recipeId:ID!){
          getAllRatingsForRecipe(recipeId: $recipeId){
            id
            recipe{
              id
            }
            author{
              id
              fullname
              username
              profileImg
            }
            rating
            body
            createdAt
          }
        }
      `, 
      variables: {
        recipeId: recipeId,
      },
    })
      .valueChanges.pipe(map((result)=>result.data.getAllRatingsForRecipe));
  }
  
  public addRecipeRating(formData: any): Observable<any>{
    return this.http.post(API_URL+'/add',formData);
  }
}
