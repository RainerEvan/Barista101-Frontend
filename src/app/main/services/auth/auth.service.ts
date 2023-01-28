import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthDetails } from '../../models/authdetails';
import { BrewService } from '../brew/brew.service';
import { EnrollmentService } from '../enrollment/enrollment.service';

const API_URL = environment.apiUrl + "/auth";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private accountSubject: BehaviorSubject<AuthDetails>;

  constructor(private router: Router, private http: HttpClient, private enrollmentService:EnrollmentService, private brewService:BrewService) { 
    this.accountSubject = new BehaviorSubject<AuthDetails>(JSON.parse(sessionStorage.getItem('account')));
  }

  public get accountValue(): AuthDetails {
    return this.accountSubject.value;
  }

  public signin(formData:any): Observable<any>{
    return this.http.post(API_URL+'/signin',formData).pipe(
      map((account:any) => {
        sessionStorage.setItem('account', JSON.stringify(account));
        this.accountSubject.next(account);
      })
    );
  }

  public signup(formData: any): Observable<any>{
    return this.http.post(API_URL+'/signup',formData);
  }

  public signout(){
    sessionStorage.removeItem('account');
    this.accountSubject.next(null);
    this.enrollmentService.endCourse();
    this.brewService.removeBrewData();
    this.router.navigate(['/signin']);
  }
}
