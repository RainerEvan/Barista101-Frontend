import { Dialog } from '@angular/cdk/dialog';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ResultDialogComponent } from '../../modules/shared/components/result-dialog/result-dialog.component';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  signinForm: FormGroup;
  loading:boolean = false;
  showPassword: boolean = false;

  constructor(public dialog:Dialog, private route: ActivatedRoute, private router: Router, private authService: AuthService, private formBuilder: FormBuilder) {
    if(this.authService.accountValue){
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {
    this.generateSigninForm();
  }

  generateSigninForm(){
    this.signinForm = this.formBuilder.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required, Validators.minLength(6)]],
    });
  }

  get username(){
    return this.signinForm.get('username');
  }

  get password(){
    return this.signinForm.get('password');
  }

  signin():void{
    if(this.signinForm.valid){
      const formData = this.signinForm.value;

      this.loading = true;

      this.authService.signin(formData).subscribe({
        next: () => {
          this.loading = false;
          const role = this.authService.accountValue.role;
          var returnUrl = "";

          if(role.match('USER')){
            returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
          } 
          else if(role.match('ADMIN')){
            returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/admin';
          }

          this.router.navigateByUrl(returnUrl);
        },
        error: (error: any) => {
          console.log(error);
          this.loading = false;
          this.password.reset();
          this.openResultDialog(false,error.message);
        }
      });
    }
  }

  openResultDialog(success:boolean,description:string){
    const dialogRef = this.dialog.open(ResultDialogComponent,{
      data:{
        success:success,
        description:description,
      }
    });
  }

  togglePassword(){
    this.showPassword = !this.showPassword;
  }
}
