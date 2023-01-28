import { Accounts } from "./accounts";
import { Courses } from "./courses";

export type Enrollments = {
    id:string;
    account:Accounts;
    course:Courses;
    startDate:Date;
    endDate:Date;
    moduleStatus:string;
    progress:number;
}