import { Roles } from "./roles";

export type Accounts = {
    id:string;
    username:string;
    email:string;
    fullname:string;
    profileImg:string;
    role:Roles;
}