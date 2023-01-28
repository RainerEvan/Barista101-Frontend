import { Accounts } from "./accounts";
import { Recipes } from "./recipes";

export type RecipeRatings = {
    id:string;
    recipe:Recipes;
    author:Accounts;
    rating:number;
    body:string;
    createdAt:Date;
}