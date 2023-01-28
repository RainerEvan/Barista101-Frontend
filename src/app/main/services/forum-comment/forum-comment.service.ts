import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ForumComments } from '../../models/forumcomments';

const API_URL = environment.apiUrl + "/forum-comment";

@Injectable({
  providedIn: 'root'
})
export class ForumCommentService {

  constructor(private http: HttpClient, private apollo: Apollo) { }

  public getAllCommentsForForum(forumId: string): Observable<ForumComments[]>{
    return this.apollo.watchQuery<any>({
      query: gql`
        query getAllCommentsForForum($forumId:ID!){
          getAllCommentsForForum(forumId: $forumId){
            id
            forum{
              id
            }
            author{
              id
              fullname
              username
              profileImg
            }
            body
            createdAt
          }
        }
      `, 
      variables: {
        forumId: forumId,
      },
    })
      .valueChanges.pipe(map((result)=>result.data.getAllCommentsForForum));
  }

  public addForumComment(formData: any): Observable<any>{
    return this.http.post(API_URL+'/add',formData);
  }

  public deleteForumComment(forumCommentId: string): Observable<any>{
    const params = new HttpParams().set('forumCommentId',forumCommentId);
    return this.http.delete(API_URL+'/delete',{params:params});
  }
}
