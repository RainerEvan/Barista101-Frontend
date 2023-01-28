import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Brews } from '../../models/brews';

const API_URL = environment.apiUrl + "/brew";

@Injectable({
  providedIn: 'root'
})
export class BrewService {

  private brewSubject: BehaviorSubject<any>;

  constructor(private http: HttpClient, private apollo: Apollo) {
    this.brewSubject = new BehaviorSubject<any>(JSON.parse(sessionStorage.getItem('brew')));
  }

  public get brewData(): any {
    return this.brewSubject.value;
  }

  public updateBrewData(brew:any){
    const data = {
      id:brew.id,
      coffee:brew.coffee,
      water:brew.water,
      ratio:brew.ratio,
      time:brew.time,
      grindSize:brew.grindSize,
      preparations:brew.preparations,
      steps:brew.steps
    }
    sessionStorage.setItem('brew', JSON.stringify(data));
    this.brewSubject.next(data);
  }

  public removeBrewData(){
    sessionStorage.removeItem('brew');
    this.brewSubject.next(null);
  }

  public getAllBrews(): Observable<Brews[]>{
    return this.apollo.watchQuery<any>({
      query:gql`
        query getAllBrews{
          getAllBrews{
            id
            title
            description
            coffee
            water
            ratio
            time
            grindSize
            preparations
            steps
            thumbnail
            createdAt
          }
        }
      `,
    })
      .valueChanges.pipe(map((result)=>result.data.getAllBrews));
  }

  public getBrew(brewId: string): Observable<Brews>{
    return this.apollo.watchQuery<any>({
      query: gql`
        query getBrew($brewId:ID!){
          getBrew(brewId: $brewId){
            id
            title
            description
            coffee
            water
            ratio
            time
            grindSize
            preparations
            steps
            thumbnail
            createdAt
          }
        }
      `, 
      variables: {
        brewId: brewId,
      },
    })
      .valueChanges.pipe(map((result)=>result.data.getBrew));
  }

  public addBrew(formData: FormData): Observable<any>{
    return this.http.post(API_URL+'/add',formData);
  }

  public editBrew(formData: FormData): Observable<any>{
    return this.http.put(API_URL+'/edit',formData);
  }

  public deleteBrew(brewId: string): Observable<any>{
    const params = new HttpParams().set('brewId',brewId);
    return this.http.delete(API_URL+'/delete',{params:params});
  }
}
