import { Accounts } from "./accounts";

export type Forums = {
    id:string;
    author:Accounts;
    title:string;
    body:string;
    thumbnail:string;
    createdAt:Date;
}