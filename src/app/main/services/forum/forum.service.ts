import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Forums } from '../../models/forums';

const API_URL = environment.apiUrl + "/forum";

@Injectable({
  providedIn: 'root'
})
export class ForumService {

  constructor(private http: HttpClient, private apollo: Apollo) { }

  public getAllForums(): Observable<Forums[]>{
    return this.apollo.watchQuery<any>({
      query:gql`
        query getAllForums{
          getAllForums{
            id
            author{
              id
              fullname
              username
              profileImg
            }
            title
            body
            thumbnail
            createdAt
          }
        }
      `,
    })
      .valueChanges.pipe(map((result)=>result.data.getAllForums));
  }

  public getAllForumsForAccount(accountId: string): Observable<Forums[]>{
    return this.apollo.watchQuery<any>({
      query: gql`
        query getAllForumsForAccount($accountId:ID!){
          getAllForumsForAccount(accountId: $accountId){
            id
            author{
              id
              fullname
              username
              profileImg          
            }
            title
            body
            thumbnail
            createdAt
          }
        }
      `, 
      variables: {
        accountId: accountId,
      },
    })
      .valueChanges.pipe(map((result)=>result.data.getAllForumsForAccount));
  }

  public getForum(forumId: string): Observable<Forums>{
    return this.apollo.watchQuery<any>({
      query: gql`
        query getForum($forumId:ID!){
          getForum(forumId: $forumId){
            id
            author{
              id
              fullname
              username
              profileImg          
            }
            title
            body
            thumbnail
            createdAt
          }
        }
      `, 
      variables: {
        forumId: forumId,
      },
    })
      .valueChanges.pipe(map((result)=>result.data.getForum));
  }

  public addForum(formData: FormData): Observable<any>{
    return this.http.post(API_URL+'/add',formData);
  }
  
  public deleteForum(forumId: string): Observable<any>{
    const params = new HttpParams().set('forumId',forumId);
    return this.http.delete(API_URL+'/delete',{params:params});
  }
}
