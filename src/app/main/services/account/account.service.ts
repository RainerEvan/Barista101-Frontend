import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Accounts } from '../../models/accounts';

const API_URL = environment.apiUrl+'/account';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private apollo: Apollo, private http: HttpClient) { }

  public getAllAccounts(): Observable<Accounts[]>{
    return this.apollo.watchQuery<any>({
      query:gql`
        query getAllAccounts{
          getAllAccounts{
            id
            username
            email
            fullname
            role{
              id
              name
            }
            profileImg          
          }
        }
      `,
    })
      .valueChanges.pipe(map((result)=>result.data.getAllAccounts));
  }

  public getAccount(accountId: string): Observable<Accounts>{
    return this.apollo.watchQuery<any>({
      query: gql`
        query getAccount($accountId:ID!){
          getAccount(accountId: $accountId){
            id
            username
            email
            fullname
            role{
              id
              name
            }
            profileImg        
          }
        }
      `, 
      variables: {
        accountId: accountId,
      },
    })
      .valueChanges.pipe(map((result)=>result.data.getAccount));
  }

  public editAccount(formData: FormData): Observable<any>{
    return this.http.put(API_URL+'/edit',formData);
  }

  public changePassword(formData: FormData): Observable<any>{
    return this.http.put(API_URL+'/change-password',formData);
  }
}
