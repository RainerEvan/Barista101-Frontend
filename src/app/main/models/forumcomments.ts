import { Accounts } from "./accounts";
import { Forums } from "./forums";

export type ForumComments = {
    id:string;
    forum:Forums;
    author:Accounts;
    body:string;
    createdAt:Date;
}