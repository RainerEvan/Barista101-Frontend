import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Recipes } from '../../models/recipes';

const API_URL = environment.apiUrl + "/recipe";

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  constructor(private http: HttpClient, private apollo: Apollo) { }

  public getAllRecipesForCategory(recipeCategoryId: string): Observable<Recipes[]>{
    return this.apollo.watchQuery<any>({
      query: gql`
        query getAllRecipesForCategory($recipeCategoryId:ID!){
          getAllRecipesForCategory(recipeCategoryId: $recipeCategoryId){
            id
            category{
              id
              name
            }
            author{
              id
              fullname
            }
            title
            thumbnail
            rating
          }
        }
      `, 
      variables: {
        recipeCategoryId: recipeCategoryId,
      },
    })
      .valueChanges.pipe(map((result)=>result.data.getAllRecipesForCategory));
  }

  public getAllRecipesForAccount(accountId: string): Observable<Recipes[]>{
    return this.apollo.watchQuery<any>({
      query: gql`
        query getAllRecipesForAccount($accountId:ID!){
          getAllRecipesForAccount(accountId: $accountId){
            id
            category{
              id
              name
            }
            author{
              id
            }
            title
            thumbnail
            rating
          }
        }
      `, 
      variables: {
        accountId: accountId,
      },
    })
      .valueChanges.pipe(map((result)=>result.data.getAllRecipesForAccount));
  }

  public getRecipe(recipeId: string): Observable<Recipes>{
    return this.apollo.watchQuery<any>({
      query: gql`
        query getRecipe($recipeId:ID!){
          getRecipe(recipeId: $recipeId){
            id
            category{
              id
              name
            }
            author{
              id
              fullname
              username
            }
            title
            description
            equipments
            ingredients
            instructions
            notes
            thumbnail
            createdAt
            rating
          }
        }
      `, 
      variables: {
        recipeId: recipeId,
      },
    })
      .valueChanges.pipe(map((result)=>result.data.getRecipe));
  }

  public addRecipe(formData: FormData): Observable<any>{
    return this.http.post(API_URL+'/add',formData);
  }
  
  public deleteRecipe(recipeId: string): Observable<any>{
    const params = new HttpParams().set('recipeId',recipeId);
    return this.http.delete(API_URL+'/delete',{params:params});
  }
}
