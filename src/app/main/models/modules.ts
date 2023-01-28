import { Contents } from "./contents";
import { Courses } from "./courses";

export type Modules = {
    id:string;
    course:Courses;
    title:string;
    thumbnail:string;
    createdAt:Date;
    contents:Contents[];
}