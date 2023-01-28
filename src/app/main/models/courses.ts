import { Modules } from "./modules";

export type Courses = {
    id:string;
    title:string;
    description:string;
    thumbnail:string;
    createdAt:Date;
    modules:number;
}