import { Accounts } from "./accounts";

export type Notifications = {
    id:string;
    receiver:Accounts;
    body:string;
    data:string;
    createdAt:Date;
}