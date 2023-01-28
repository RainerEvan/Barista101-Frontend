import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup;
  loading:boolean = false;
  showPassword: boolean = false;

  constructor(private route: ActivatedRoute, private router: Router, private authService: AuthService, private formBuilder: FormBuilder) {
    if(this.authService.accountValue){
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {
    this.generateSignupForm();
  }

  generateSignupForm(){
    this.signupForm = this.formBuilder.group({
      email: [null, [Validators.required]],
      fullname: [null, [Validators.required]],
      username: [null, [Validators.required]],
      password: [null, [Validators.required, Validators.minLength(6)]],
      confirmPassword: [null, [Validators.required, Validators.minLength(6)]],
      role: ['USER',[Validators.required]]
    });
  }

  get email(){
    return this.signupForm.get('email');
  }
  get fullname(){
    return this.signupForm.get('fullname');
  }
  get username(){
    return this.signupForm.get('username');
  }
  get password(){
    return this.signupForm.get('password');
  }
  get confirmPassword(){
    return this.signupForm.get('confirmPassword');
  }

  signup():void{
    if(this.signupForm.valid && this.password.value == this.confirmPassword.value){
      const formData = this.signupForm.value;

      this.loading = true;

      this.authService.signup(formData).subscribe({
        next: () => {
          this.signin(formData);
        },
        error: (error: any) => {
          console.log(error);
          this.loading = false;
        }
      });
    }
  }

  signin(data:any):void{
    const formData = {
      username:data.username,
      password:data.password
    }

    this.authService.signin(formData).subscribe({
      next: () => {
        this.loading = false;
        const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
        this.router.navigateByUrl(returnUrl);
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }

  togglePassword(){
    this.showPassword = !this.showPassword;
  }
}
