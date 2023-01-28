import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Modules } from '../../models/modules';

const API_URL = environment.apiUrl + "/module";

@Injectable({
  providedIn: 'root'
})
export class ModuleService {

  constructor(private http: HttpClient, private apollo:Apollo) { }

  public getAllModulesForCourse(courseId: string): Observable<Modules[]>{
    return this.apollo.watchQuery<any>({
      query: gql`
        query getAllModulesForCourse($courseId:ID!){
          getAllModulesForCourse(courseId: $courseId){
            id
            title
            thumbnail
            createdAt
            contents{
              id
            }
          }
        }
      `, 
      variables: {
        courseId: courseId,
      },
    })
      .valueChanges.pipe(map((result)=>result.data.getAllModulesForCourse));
  }

  public getModule(moduleId: string): Observable<Modules>{
    return this.apollo.watchQuery<any>({
      query: gql`
        query getModule($moduleId:ID!){
          getModule(moduleId: $moduleId){
            id
            course{
              id
            }
            title
            thumbnail
            createdAt
            contents{
              id
              title
              body
              thumbnail
            }
          }
        }
      `, 
      variables: {
        moduleId: moduleId,
      },
    })
      .valueChanges.pipe(map((result)=>result.data.getModule));
  }

  public addModule(formData: FormData): Observable<any>{
    return this.http.post(API_URL+'/add',formData);
  }

  public editModule(formData: FormData): Observable<any>{
    return this.http.put(API_URL+'/edit',formData);
  }

  public deleteModule(moduleId: string): Observable<any>{
    const params = new HttpParams().set('moduleId',moduleId);
    return this.http.delete(API_URL+'/delete',{params:params});
  }
}
