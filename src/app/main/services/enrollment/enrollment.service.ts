import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Enrollments } from '../../models/enrollments';

const API_URL = environment.apiUrl + "/enrollment";

@Injectable({
  providedIn: 'root'
})
export class EnrollmentService {

  private enrollmentSubject: BehaviorSubject<string>;

  constructor(private http: HttpClient, private apollo: Apollo) { 
    this.enrollmentSubject = new BehaviorSubject<string>(sessionStorage.getItem('enrollment'));
  }

  public get currEnrollment(): string {
    return this.enrollmentSubject.value;
  }

  public startCourse(enrollmentId:string){
    sessionStorage.setItem('enrollment', enrollmentId);
    this.enrollmentSubject.next(enrollmentId);
  }

  public endCourse(){
    sessionStorage.removeItem('enrollment');
    this.enrollmentSubject.next(null);
  }

  public getAllEnrollmentsForAccount(accountId: string): Observable<Enrollments[]>{
    return this.apollo.watchQuery<any>({
      query: gql`
        query getAllEnrollmentsForAccount($accountId:ID!){
          getAllEnrollmentsForAccount(accountId: $accountId){
            id
            progress
          }
        }
      `, 
      variables: {
        accountId: accountId,
      },
    })
      .valueChanges.pipe(map((result)=>result.data.getAllEnrollmentsForAccount));
  }

  public getEnrollmentForCourseAndAccount(courseId: string,accountId: string): Observable<Enrollments>{
    return this.apollo.watchQuery<any>({
      query: gql`
        query getEnrollmentForCourseAndAccount($courseId:ID!,$accountId:ID!){
          getEnrollmentForCourseAndAccount(courseId: $courseId,accountId: $accountId){
            id
            startDate
            endDate
            moduleStatus
            progress
          }
        }
      `, 
      variables: {
        courseId: courseId,
        accountId: accountId,
      },
    })
      .valueChanges.pipe(map((result)=>result.data.getEnrollmentForCourseAndAccount));
  }

  public getEnrollment(enrollmentId: string): Observable<Enrollments>{
    return this.apollo.watchQuery<any>({
      query: gql`
        query getEnrollment($enrollmentId:ID!){
          getEnrollment(enrollmentId: $enrollmentId){
            id
            startDate
            endDate
            moduleStatus
            progress
          }
        }
      `, 
      variables: {
        enrollmentId: enrollmentId,
      },
    })
      .valueChanges.pipe(map((result)=>result.data.getEnrollment));
  }

  public addEnrollment(formData: any): Observable<any>{
    return this.http.post(API_URL+'/add',formData);
  }

  public finishModule(formData: FormData): Observable<any>{
    return this.http.put(API_URL+'/finish-module',formData);
  }
}
