import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Courses } from '../../models/courses';

const API_URL = environment.apiUrl + "/course";

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(private http: HttpClient, private apollo: Apollo) { }

  public getAllCourses(): Observable<Courses[]>{
    return this.apollo.watchQuery<any>({
      query:gql`
        query getAllCourses{
          getAllCourses{
            id
            title
            description
            thumbnail
            createdAt
            modules
          }
        }
      `,
    })
      .valueChanges.pipe(map((result)=>result.data.getAllCourses));
  }

  public getCourse(courseId: string): Observable<Courses>{
    return this.apollo.watchQuery<any>({
      query: gql`
        query getCourse($courseId:ID!){
          getCourse(courseId: $courseId){
            id
            title
            description
            thumbnail 
            createdAt
            modules
          }
        }
      `, 
      variables: {
        courseId: courseId,
      },
    })
      .valueChanges.pipe(map((result)=>result.data.getCourse));
  }

  public addCourse(formData: FormData): Observable<any>{
    return this.http.post(API_URL+'/add',formData);
  }

  public editCourse(formData: FormData): Observable<any>{
    return this.http.put(API_URL+'/edit',formData);
  }

  public deleteCourse(courseId: string): Observable<any>{
    const params = new HttpParams().set('courseId',courseId);
    return this.http.delete(API_URL+'/delete',{params:params});
  }
}
