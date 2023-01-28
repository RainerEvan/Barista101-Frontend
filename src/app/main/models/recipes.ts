import { Accounts } from "./accounts";
import { RecipeCategories } from "./recipecategories";

export type Recipes = {
    id:string;
    category:RecipeCategories;
    author:Accounts;
    title:string;
    description:string;
    equipments:string;
    ingredients:string;
    instructions:string;
    notes:string;
    thumbnail:string;
    createdAt:Date;
    rating:number;
}